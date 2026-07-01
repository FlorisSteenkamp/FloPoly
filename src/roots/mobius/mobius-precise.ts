import { γ1, γγ3 } from "../../error-analysis/gamma.js";
import { inplaceTaylorShiftBy1WithInpErr, taylorShiftWithInpErr } from "../../change-variables/double/taylor-shift-with-inp-err.js";
import { inplaceScaleWithInpErr } from "../../change-variables/double/scale-with-inp-err.js";
import { ddTaylorShiftWithInpErr } from "./dd-taylor-shift-with-inp-err.js";
import { ddInplaceScaleWithInpErr } from "../../change-variables/double-double/dd-scale-with-inp-err.js";
import { eTaylorShift } from '../../change-variables/expansion/e-taylor-shift.js';
import { eScale } from '../../change-variables/expansion/e-scale.js';

const { abs, sign } = Math;


/**
 * Returns the number of sign changes in the polynomial coefficents after
 * applying a Mobius transformation to the given polynomial.
 * 
 * * this is a specialized function used specifically by `isolateRoots`
 * 
 * Applies a Mobius transformation to the given polynomial:
 * * p(x) -> (x + 1)^n * p((ax + b) / (x + 1))
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 * 
 * This runs in `O(n^2)` arithmetic operations (where `n` is the degree) by
 * decomposing the Mobius map into elementary steps, rather than the `O(n^3)`
 * of expanding and summing `Σ cᵢ (ax + b)^i (x + 1)^(n-i)` directly.
 *
 * The decomposition (see https://math.stackexchange.com/questions/694565)
 * uses the identity `(ax + b)/(x + 1) = a + (b - a)/(x + 1)`, which yields
 *
 *   (x + 1)^n * p((ax + b)/(x + 1)) = S₁( R( Scₐ₋ᵦ( Sₐ(p) ) ) )
 *
 * where
 *   * `Sₕ(f) = f(x + h)`           is a Taylor shift (`O(n^2)`),
 *   * `Sc_s(f)` scales the coefficient of `xⁱ` by `sⁱ` (`O(n)`),
 *   * `R(f)` reverses the coefficient array, i.e. `xⁿ f(1/x)` (`O(n)`).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * **NOT** scaled by `γ1`
 * @param pDd a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`
 * @param pDd_ an array of numbers representing the absolute error bounds on the
 * coefficients of `pDd`; the actual error bound on the coefficient of `xⁱ` is `pDd_[i]*γγ(3)`
 * @param getPExact defaults to `undefined`; a function returning the exact 
 * polynomial (with coefficients given as Shewchuk expansions)
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 * @param A sign-certified evaluation of polynomial at the lower bound of the interval
 * @param B sign-certified evaluation of polynomial at the upper bound of the interval
 * @param failCount the number of times the Mobius transformation has failed to certify the sign
 * 
 * @internal
 */
function mobiusPrecise(
        p: number[],
        p_: number[],
        pDd: number[][],
        pDd_: number[],
        getPExact: () => number[][]) {

    return function mobiusPrecise_(
            a: number,
            b: number,
            A: number,
            B: number,
            failCount: number): number {

        //-------------------------------------------
        // Taylor shift by `a`, i.e. p(x + a)
        //-------------------------------------------
        let [q, q_] = taylorShiftWithInpErr(p, a, p_);

        //---------------------------------------------------
        // Scale the coefficient of xⁱ by (b - a)ⁱ
        //---------------------------------------------------
        inplaceScaleWithInpErr(q, b - a, q_);

        //-------------------------------------------------------------
        // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
        //-------------------------------------------------------------
        q.reverse();
        q_.reverse();

        //-------------------------------------------
        // Taylor shift by 1, i.e. q(x + 1)
        //-------------------------------------------
        inplaceTaylorShiftBy1WithInpErr(q, q_);

        let numSignChangesMax = 0;  // Max possible number of real sign changes
        let numUncertifyable = 0;  // number of coefficients who's sign cannot be certified
        // The sign of `A` and `B` are both !== 0 and is certified since it is an
        // endpoint of the interval.
        let _s = sign(A);  // Sign is certified
        let certifyable = true;
        for (let i=1; i<q.length - 1; i++) {
            let s = sign(q[i]);
            const v = q[i];
            const err = q_[i]*γ1;
            
            if (abs(v) <= err) {
                // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
                // we are actually allowed one uncertifyable coefficient (but **only** if numSignChanges
                // equals 1)!
                if (certifyable === false) {  // **if certifyable was already false**
                    // Important: If we find consecutive "zeros" then either we need to increase
                    // the precision to resolve them OR it is just by coincidence that they cannot
                    // be resolved from zero, in which case it is very likely that the next split
                    // will resolve correctly.
                    return ddMobius(pDd, pDd_, a, b, A, B, failCount, getPExact);
                }
                certifyable = false;
                numUncertifyable++;
                // If we encounter a "zero" we make its sign different than the
                // previous one so it can count as a sign change; this differs
                // from the usual way of counting sign changes.
                s = -_s;
            }

            if (s !== _s) {
                numSignChangesMax++;
                _s = s;
            }
        }
        const s = sign(B);  // Sign is certified
        if (s !== _s) { numSignChangesMax++; }

        return numSignChangesMax;  // guaranteed OR need to split interval
    }
}


function ddMobius(
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        A: number,
        B: number,
        failCount: number,
        getPExact: () => number[][]): number {

    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let [q,q_] = ddTaylorShiftWithInpErr(pDd, a, pDd_);

    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    ddInplaceScaleWithInpErr(q, b - a, q_);

    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();
    q_.reverse();

    //-------------------------------------------
    // S₁: Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    [q,q_] = ddTaylorShiftWithInpErr(q, 1, q_);


    let numSignChanges = 0;  // number of sign changes
    let numUncertifyable = 0;  // number of coefficients who's sign cannot be certified
    // The sign of `A` and `B` are both !== 0 and is certified since it is an
    // endpoint of the interval.
    let _s = sign(A);
    let certifyable = true;
    let failed = false;
    for (let i=0; i<q.length - 1; i++) {
        // No error in the sign of the last coefficient (important for parity of sign changes)
        let s = sign(q[i][1]);

        const err = q_[i]*γγ3;
        const c = q[i];

        if (err >= abs(c[1])) {
            // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
            // we are actually allowed one uncertifyable coefficient (but **only** if `numSignChanges`
            // equals 1)!
            if (certifyable === false) {  // if certifyable was already false
                // Indicates that this interval should me marked as "failed once".
                // If it fails twice in a row it is very likely the issue is due to double-double
                // precision not being accurate enough. In rare cases it just so happened
                // that 2 consecutive coefficients were unresolvable from 0.
                // In future we can somehow calculate the max times this type of fail is possible
                // consecutively (conjecture: it is less than `deg(P)`).
                failed = true;
            }
            certifyable = false;
            numUncertifyable++;
            // If we encounter a "zero" we make its sign different than the
            // previous one so it can count as a sign change; this differs
            // from the usual way of counting sign changes.
            s = -_s;
        }

        if (s !== _s) {
            numSignChanges++;
            _s = s;
        }
    }
    const s = sign(B);  // Sign is certified
    if (s !== _s) {
        numSignChanges++;
    }

    // if (numUncertifyable === 1 && numSignChanges === 1) {
    //     return 1;  // **guaranteed** to have exactly one root in the interval
    // }

    if (!failed) {
        return numSignChanges;
    }

    return failCount > 1
        ? eMobius(getPExact,a,b,A,B)
        : -numSignChanges;  // `failCount` is still 1, so we can try again after another split of the interval;

    // We need to split the interval into two subintervals since we
    // cannot guarantee the number of sign changes in the Mobius coefficients.
    // But, the sign of `A` and `B` are both !== 0 and certified so we *can* certify
    // the parity (and max value) of the number of sign changes!
}


function eMobius(
        getPExact: () => number[][],
        a: number,
        b: number,
        A: number,
        B: number): number {

    const pE = getPExact();

    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let q = eTaylorShift(pE, a);

    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    q = eScale(q, b - a);

    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();

    //-------------------------------------------
    // Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    q = eTaylorShift(q, 1);


    //--------------------------------------------------------
    // Calc number of sign changes in the Mobius coefficients
    //--------------------------------------------------------
    let numSignChanges = 0;  // number of sign changes

    let _s = sign(A);
    for (let i=1; i<q.length; i++) {
        const c = q[i];
        let s = sign(c[c.length - 1]);  // Sign is certified (in exact precision)

        if (s !== _s && s !== 0) {
            numSignChanges++;
            _s = s;
        }
    }

    return numSignChanges;
}


export { mobiusPrecise }
