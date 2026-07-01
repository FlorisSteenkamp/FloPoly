import type { RootInterval } from '../root-interval.js';
import { eps } from '../../error-analysis/gamma.js';
import { mobiusPrecise } from '../mobius/mobius-precise.js';
import { refineCertified } from '../refine-certified.js';
import { HornerWithInpError } from '../../evaluate/double/horner-with-inp-error.js';
import { γ1, γγ3 } from '../../error-analysis/gamma.js';
import { transposePoly } from '../transpose-poly.js';
import { ddHornerWithInpError } from '../../evaluate/double-double/dd-horner-with-inp-error.js';
import { eHorner } from '../../evaluate/expansion/e-horner.js';
import { eCompress } from 'big-float-ts';

const { abs, min, max, log2, ceil } = Math;


const γγ3_γ1 = γγ3/γ1;  // ~ 3*u


/**
 * Returns a list of intervals isolating the roots of the given polynomial
 * within the given interval `[lb,ub]`.
 * 
 * * the interval might be extended if roots fall close to its endpoints.
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`; this polynomial is derived
 * from `pDd` as a double precision approximation
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ an array of numbers representing the absolute error bounds on the
 * coefficients of `pDd`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param lb the start of the interval to search for roots
 * @param ub the end of the interval to search for roots
 * @param getPExact defaults to `undefined`; a function returning the exact 
 * polynomial (with coefficients given as Shewchuk expansions)
 * 
 * @internal
 */
function isolateRoots(
        p: number[],
        pDd: number[][],
        pDd_: number[],
        lb: number,
        ub: number,
        getPExact: () => number[][]): RootInterval[] {

    /**
     * The error bound (that still needs to be multiplied by `γ(1)` of the double
     * precision coefficients.
     */
    // `E*γγ3_γ1` -> the new error need to be scaled by `γ1` and not `γγ3`
    // `abs(p[idx])` -> round-off from double-double to double precision
    const p_ = pDd_.map((E,idx) => E*γγ3_γ1 + abs(p[idx]));

    //--------------------------------------------------------------------------
    // Make sure endpoints don't fall too close to roots as this drastically
    // slows down the root isolation process.
    //--------------------------------------------------------------------------
    const _lb_ = lb;
    const _ub_ = ub;

    const W = ub - lb;
    let A: number;
    let ea: number;
    while (true) {
        ([A,ea] = HornerWithInpError(p, lb, p_));
        if (abs(A) > ea*γ1) {  // if we can certify the sign of `p(t)`
            break;
        }
        lb -= W/4;
    }
    let B: number;
    let eb: number;
    while (true) {
        ([B,eb] = HornerWithInpError(p, ub, p_));
        if (abs(B) > eb*γ1) {  // if we can certify the sign of `p(t)`
            break;
        }
        ub += W/4;
    }
    //------------------------------------------------

    // Initial root interval with sign-certified endpoint values and a fail count.
    const Is = [[lb,ub,A,B,0]];
    const Is_: RootInterval[] = [];  // Isolated root intervals will be stored here

    let treeSize = 0;  // TODO - remove eventually

    const mobiusPrecise_ = mobiusPrecise(p, p_, pDd, pDd_, getPExact);

    let errBound: number[];
    let pDdTransposed: number[][];

    while (Is.length > 0) {
        treeSize++;

        const I = Is.pop()!;
        const [a,b,A,B,failCount] = I;
        // [I[0],I[1]];//?

        //----------------------------------------------------------------------
        // Descarte's rule of signs to count the number of roots in this interval
        //----------------------------------------------------------------------
        const varP = mobiusPrecise_(a, b, A, B, failCount);

        // If `varP < 0` we couldn't distinguish Mobius coefficients from `0`
        // without going to infinite precision.

        if (varP === 0) {  // no roots in the open interval `(a,b)`
            continue;
        } 
        
        if (varP === 1) {  // exactly one root in this interval
            errBound = errBound! || pDd_.map(E => E*γγ3);
            pDdTransposed = pDdTransposed! || transposePoly(pDd);
            const r = refineCertified(pDdTransposed, errBound, a, b, A, B, getPExact, false);
            Is_.push({ tS: r[0], tE: r[1], multiplicity: 1 });

            continue;
        }
         
        const realFailCount = varP < 0 ? failCount + 1 : 0;

        //-----------------------------------------------------------------
        // **possibly** more than one root in this interval
        //-----------------------------------------------------------------
        const W = b - a;
        const minW = 2*eps * max(1, 2**ceil(log2(min(abs(a), abs(b)))));
        if (W <= minW) {
            // `varP` is guaranteed to be correct (except it can be larger by a multiple of 2)
            // since the sign of `A` and `B` are both certified,
            Is_.push({ tS: a, tE: b, multiplicity: abs(varP) });
            continue;  // stop recursion when intervals are too small
        }

        const [t, T] = admissablePoint(p, p_, pDd, pDd_, a, b, getPExact);

        // The sign of `T` is certified.
        Is.push([a, t!, A, T, realFailCount]);
        Is.push([t!, b, T, B, realFailCount]);
    }

    if (treeSize !== 1) {
        treeSize; //?
    }

    Is_.reverse();

    return Is_.filter(I => {
        const { tS, tE } = I;
        if (tE < _lb_ || tS > _ub_) { return false; }
        return true;
    });
}


function admissablePoint(
        p: number[],
        p_: number[],
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        getPExact: () => number[][]): [number, number] {

    // We don't use multipoint evaluation here since it is too slow for low order
    // polynomials but we need to find an "admissable" point to split the interval at.
    // * see [Computing Real Roots of Real Polynomials](https://arxiv.org/pdf/1308.4088) by Sagraloff
    // Algorithm: Admissible Point (note: their repeat-until loop should be repeat-while as they noted later)
    //-----------------------------------------------------------------
    const n = p.length - 1;
    let c = 0;  // count of points tested so far
    let d = 1;  // number of subintervals to split the interval into

    // Corollary 16: Sagraloff & Mehlhorn 2015 (arXiv:1308.4088):
    // The corollary starts with:
    // Let $$L \ge L_{I,0} := \log M\!\left(\min\left(|P(a)|, |P(b)|\right)^{-1}\right) + 2(n + 1) + 1||
    // Let L ≥ Lᵢ,₀ := log M(min(|P(a)|, |P(b)|)⁻¹) + 2(n + 1) + 1
    // Note: We don't use the above Corollary (or Corollary 20) since we don't care if endpoints
    // are close to zero (in fact, we prefer it) because we don't determine a bit-length precision beforehand;
    // rather, we increase the precision each time until we can certify the coefficient signs.

    // E.g. `t`s of points for `deg(p) === 4` for `I === [-0.5,1.5]`: [0.5, 0.25, 0.75, 0.125, 0.375]
    while (true) {
        d *= 2;
        for (let j=1; j<d; j += 2) {
            c++;
            const t = a + (b - a)*(d + 2*j)/(4*d);  // sample in the middle half [a+W/4, a+3W/4]
            const [T,e] = HornerWithInpError(p, t, p_);

            if (abs(T) > e*γ1) {
                // If we can certify the sign of `p(t)` then don't waste time
                // looking for the best point.
                return [t, T];
            }

            if (c > n) {
                // console.log('failed to find an admissable point in double precision');
                return ddAdmissablePoint(pDd, pDd_, a, b, getPExact);
            }
        }
    }
}


function ddAdmissablePoint(
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        getPExact: () => number[][]): [number, number] {

    // E.g. `t`s of points for `deg(p) === 4` for `I === [-0.5,1.5]`: [0.5, 0.25, 0.75, 0.125, 0.375]
    const n = pDd.length - 1;
    let c = 0;  // count of points tested so far
    let d = 1;  // number of subintervals to split the interval into

    while (true) {
        d *= 2;
        for (let j=1; j<d; j += 2) {
            c++;
            const t = a + (b - a)*(d + 2*j)/(4*d);
            const [T,e] = ddHornerWithInpError(pDd, t, pDd_);

            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if (abs(T[1]) > e*γγ3) {
                return [t, T[1]];
            }

            if (c > n) {
                // console.log('failed to find an admissable point in double-double precision');
                const pE = getPExact();
                return eAdmissablePoint(pE, a, b);
            }
        }
    }
}


function eAdmissablePoint(
        pE: number[][],
        a: number,
        b: number): [number, number] {

    // E.g. of points for degree(p) === 4: [0.5, 0.25, 0.75, 0.125, 0.375]
    let d = 1;  // number of subintervals to split the interval into

    while (true) {
        d *= 2;
        for (let j=1; j<d; j += 2) {
            const t = a + (b - a)*(d + 2*j)/(4*d);
            const T = eCompress(eHorner(pE, t));  // no error
            const $T = T[T.length-1];

            // If we can certify the sign of `p(t)` then don't waste time
            // looking for the best point.
            if ($T !== 0) {  // no error
                return [t, $T];
            }

            // if (c > n) {
            //   // It should not be possible to get to this point since we
            //   // tested more points than the degree of the polynomial so
            //   // at least one of the roots should have been resolved from zero.
            // }
        }
    }
}


// import { Horner } from '../../evaluate/double/horner.js';
// import { differentiate } from '../../calculus/double/differentiate.js';
// /**
//  * Returns a guess for the position of a cluster of roots
//  * 
//  * * The `0-test` and `1-test` must have failed for the iterval `[a,b]`
//  * 
//  * @param p a polynomial with coefficients given densely as an array of double
//  * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
//  * represents the polynomial `5x^2 - 3x`
//  * @param a the start of the interval to search for roots
//  * @param b the end of the interval to search for roots
//  * @param NI the interval reduction multiplier, i.e. `2**(2**nI)` with `nI` being
//  * a parameter `>= 1` for the interval (as per "Algorithm: Newton-Test" in
//  * [Computing Real Roots of Real Polynomials](https://arxiv.org/pdf/1308.4088)
//  * 
//  */
// function guessCluster(
//         p: number[],
//         a: number,
//         b: number,
//         NI: number): number {

//     // (1) Let ξ₁ := a + ¼·w(I), ξ₂ := a + ½·w(I), ξ₃ := a + ¾·w(I)
//     // ...
//     const W = b - a;
//     const E1 = a + 0.25*W;
//     const E2 = a + 0.50*W;
//     const E3 = a + 0.75*W;
//     const Es = [E1,E2,E3];

//     // (2) For each of the three distinct pairs (j1, j2) of indices j1, j2 ∈ {1, 2, 3}
//     // ...
//     const pDiff = differentiate(p);
//     for (let idxs of [[1,2],[1,3],[2,3]]) {
//         const [i,j] = idxs;
//         const Ea = Es[i];
//         const Eb = Es[j];

//         const Aa = Horner(p,Ea);
//         const Ab = Horner(p,Eb);
//         const A$a = Horner(pDiff,Ea);
//         const A$b = Horner(pDiff,Eb);


//     }
// }


export { isolateRoots }
