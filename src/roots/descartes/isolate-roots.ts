import type { RootInterval } from '../root-interval.js';
import { eps } from '../../error-analysis/gamma.js';
import { mobiusPrecise } from '../mobius/mobius-precise.js';
import { refineCertified } from '../refine-certified.js';
import { HornerWithInpError } from '../../evaluate/double/horner-with-inp-error.js';
import { γ1, γγ3, u } from '../../error-analysis/gamma.js';
import { allRootsCertified } from '../certified/all-roots-certified.js';
import { transposePoly } from '../transpose-poly.js';
import { ddHornerWithInpError } from '../../evaluate/double-double/dd-horner-with-inp-error.js';

const { abs, min, max, log2, ceil } = Math;


const γγ3_γ1 = γγ3/γ1;  // ~ 3*u
// const SPARE_BITS = 8;  // number of bits to spare when certifying the sign of p(t) at an interval endpoint


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
 * coefficients of `p`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param lb the start of the interval to search for roots
 * @param ub the end of the interval to search for roots
 * 
 * @internal
 */
function isolateRoots(
        p: number[],
        pDd: number[][],
        pDd_: number[],
        lb: number,
        ub: number,
        getPExact: () => number[][]): RootInterval[] | undefined {

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
    const W = ub - lb;
    let found = false;
    let A: number;
    let ea: number;
    while (true) {
        ([A,ea] = HornerWithInpError(p, lb, p_));
        if (abs(A) > ea*γ1) {  // if we can certify the sign of `p(t)`
            found = true;
            break;
        }
        lb -= W/4;
    }
    found = false;
    let B: number;
    let eb: number;
    while (true) {
        ([B,eb] = HornerWithInpError(p, ub, p_));
        if (abs(B) > eb*γ1) {  // if we can certify the sign of `p(t)`
            found = true;
            break;
        }
        ub += W/4;
    }
    //------------------------------------------------

    const Is = [[lb,ub,A,B]];  // Initial root interval with endpoints (signs are certified at endpoints)
    const Is_: RootInterval[] = [];  // Isolated root intervals will be stored here

    // TODO - make sure roots are ordered correctly.
    let count = 0;  // TODO - remove eventually

    const mobiusPrecise_ = mobiusPrecise(p, p_, pDd, pDd_);

    while (Is.length > 0/* && count < 160*/) {
        count++;

        const I = Is.pop()!;
        const [a,b,A,B] = I;

        //----------------------------------------------------------------------
        // Descarte's rule of signs to count the number of roots in this interval
        //----------------------------------------------------------------------
        const varP = mobiusPrecise_(a, b, A, B);

        // If `varP < 0` we couldn't distinguish Mobius coefficients from `0`
        // without going to infinite precision.
        // We shouldn't bail (`admissablePoint` will eventually bail.)

        if (varP === 0) {  // no roots in the open interval `(a,b)`
            continue;
        } else if (varP === 1) {  // exactly one root in this interval
            const errBound = pDd_.map(E => E*γγ3);
            const pDd2 = transposePoly(pDd);  // TODO - improve?; could be slow(ish)
            const r = refineCertified(pDd2, errBound, a, b, A, B, getPExact, false);
            Is_.push({ tS: r[0], tE: r[1], multiplicity: 1 });
        } else {
            //-----------------------------------------------------------------
            // **possibly** more than one root in this interval
            //-----------------------------------------------------------------
            const W = b - a;
            // TODO - make sure below needn't be 2*eps - in fact this only valid for intervals of width ~ 1
            // TODO - make stopping criterion scale with max(abs(interval endpoints))
            if (W <= 4*eps) {
                // The parity below of `varP` is guaranteed to be correct since the sign of `A` and `B` are both certified,
                // however the actual number of sign changes can be a multiple of 2 less or more than `varP`.
                Is_.push({ tS: a, tE: b, multiplicity: varP });
                continue;  // stop recursion when intervals are smaller than 4*eps
            }

            const ap = admissablePoint(p, p_, pDd, pDd_, a, b, A, B);
            if (ap === undefined) {
                // Bail out to a different root isolation method (using Rolle's Theorem)
                // for very hard cases only because this will be too slow (due to multiple roots
                // being very close together).
                Is_.push(...allRootsCertified(pDd, a, b, pDd_, getPExact, true)!);
                continue;
            }

            const { t, T } = ap;

            // The sign of `T` is certified.
            Is.push([a, t!, A, T]);
            Is.push([t!, b, T, B]);
        }
    }

    if (count !== 1) {
        count; //?
    }

    return Is_;
}


function admissablePoint(
        p: number[],
        p_: number[],
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        A: number,
        B: number): { t: number, T: number } | undefined {

    // We don't use multipoint evaluation here since it is too slow but we
    // need to find an "admissable" point to split the interval at.
    // * see [Computing Real Roots of Real Polynomials](https://arxiv.org/pdf/1308.4088) by Sagraloff
    // Algorithm: Admissible Point (note: their repeat-until loop should be repeat-while as they noted later)
    // In our case the admissable point helps to find a point with low condition number and
    // helps to ensure later mobius coeffients are far from zero for future divisions.
    //-----------------------------------------------------------------
    // E.g. of points for degree(p) === 4: [0.5, 0.25, 0.75, 0.125, 0.375]
    const n = p.length - 1;
    let c = 0;  // count of points tested so far
    let d = 1;  // number of subintervals to split the interval into
    let t: number;
    let T: number;
    let e: number;
    // let tAlt: number | undefined;  // alternative point if we can't find a point with bits to spare
    // let TAlt: number | undefined;  // ...

    // Corollary 16: Sagraloff & Mehlhorn 2015 (arXiv:1308.4088):
    // The corollary starts with:
    // Let $$L \ge L_{I,0} := \log M\!\left(\min\left(|P(a)|, |P(b)|\right)^{-1}\right) + 2(n + 1) + 1||
    // Let L ≥ Lᵢ,₀ := log M(min(|P(a)|, |P(b)|)⁻¹) + 2(n + 1) + 1
    // We modify this slightly to:
    // Let $$L \ge L_{I,0} := \log \!\left(\min\left(|P(a)|, |P(b)|\right)^{-1}\right) + 2(n + 1) + 1||
    // Let L ≥ Lᵢ,₀ := log (min(|P(a)|, |P(b)|)⁻¹) + 2(n + 1) + 1
    // to account for larger values of |P(a)| and |P(b)| (i.e. > 1) so we can limit
    // the number of extra bits required.

    // const _A = abs(A);
    // const _B = abs(B);
    // L -> max number of bits that can be "consumed" by `mobiusPrecise`;
    // Since `mobiusPrecise` goes up to double-double precision we have 106 bits
    // to start off with
    // const L0 = ceil(-log2(min(_A,_B))) + 2*(n + 1) + 1;
    // const L1 = 1;

    /**
     * The number of times any mobius coefficient can be smaller than `min(A,B)`
     * during the next 0-test if the current interval contains no roots.
     */
    const L0 = 2**(2*(n + 1) + 1);
    /**
     * The number of times any mobius coefficient can be smaller than `min(A,B,M)`
     * during the next 1-test if the current interval contains no roots.
     */
    const L1 = 2**(4*n + 1);
    // 4*n + 1;//?
    // L1/L0;//?

    while (true) {
        d *= 2;
        for (let j=1; j<d; j += 2) {
            c++;
            t = a + j/d*(b - a)/2;  // we divide by 2 to test points in the middle half of the interval only
            ([T,e] = HornerWithInpError(p, t, p_));

            // TODO - currently we assume `e` is at least as large as the max error of mobius
            const _T = abs(T);
            // if (_T - e*γ1 > 2**(L0 - 53)) {
            const eγ1 = e*γ1;//?
            const eγγ3 = e*γγ3;//?
            const TT = _T - eγ1;
            // TT/eγ1;//?
            // L0;//?
            // TT/eγ1/L1;//?
            // if (TT - eγ1 > 0 && TT/eγ1 > L1) {
            if (TT - eγ1 > 0 && TT/eγγ3 > L1) {
                // If we can certify the sign of `p(t)` with some bits to spare
                // then don't waste time looking for the best point. This value
                // ensures `mobiusPrecise` will have enough bits to spare to certify signs
                // of Mobius coefficients.

                // _T;//?
                // eγ1;//?
                return { t, T };
            }
            // L1;//?
            // [_T,eγ1];//?
            // There are 53 significand bits per double (double-double -> 106)
            // if (_T - e*γ1 > 2**(L0 - 106)) {
            //     if (TAlt === undefined || (TAlt !== undefined && _T > abs(TAlt))) {
            //         tAlt = t;
            //         TAlt = T;
            //     }
            // }
            if (c > n) {
                // 2**(L - 106);//?
                // TAlt;//?
                // if (TAlt !== undefined) {
                //     return { t: tAlt!, T: TAlt };
                // }
                // t;//?
                return ddAdmissablePoint(pDd, pDd_, a, b, L0, L1);
            }
        }
    }
}


function ddAdmissablePoint(
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        L0: number,
        L1: number): { t: number, T: number } | undefined {

    // E.g. of points for degree(p) === 4: [0.5, 0.25, 0.75, 0.125, 0.375]
    const n = pDd.length - 1;
    let c = 0;  // count of points tested so far
    let d = 1;  // number of subintervals to split the interval into
    let t: number;
    let T: number[];
    let e: number;
    // let tAlt: number | undefined;  // alternative point if we can't find a point with bits to spare
    // let TAlt: number[] | undefined;  // ...

    while (true) {
        d *= 2;
        for (let j=1; j<d; j += 2) {
            c++;
            t = a + j/d*(b - a)/2;  // we divide by 2 to test points in the middle half of the interval only
            ([T,e] = ddHornerWithInpError(pDd, t, pDd_));
            // e;//?
            // T;//?

            const _T = abs(T[1]);
            const eγγ3 = e*γγ3;
            const TT = _T - eγγ3;

            // if (_T - e*γγ3 > 2**(L - 106)) {
            // TT/eγγ3;//?
            // TT/eγγ3/L1;//?
            if (TT - eγγ3 > 0 && TT/eγγ3 > L1) {
                TT/eγγ3;//?
                return { t, T: T[1] };
            }

            // There are 53 significand bits per double (double-double -> 106)
            // if (_T - e*γγ3 > 2**(L - 106)) {
            //     // _T;        //?
            //     // _T - e*γγ3;//?
            //     // L;//?
            //     if (TAlt === undefined || (TAlt !== undefined && _T > abs(TAlt[1]))) {
            //         tAlt = t;
            //         TAlt = T;
            //     }
            // }
            TT;//?
            TT/eγγ3/L1;//?
            if (c > n) {
                TT/eγγ3/L1;//?
                // if (TAlt !== undefined) {
                //     return { t: tAlt!, T: TAlt[1] };
                // }
                // t;//?
                // console.log('failed to find an admissable point');
                // throw 'temp throw for testing'
                return undefined;
            }
        }
    }
}


export { isolateRoots }
