import { γ1, γγ3 } from "../../error-analysis/gamma.js";
import { inplaceTaylorShiftBy1WithInpErr, taylorShiftWithInpErr } from "../../change-variables/double/taylor-shift-with-inp-err.js";
import { inplaceScaleWithInpErr } from "../../change-variables/double/scale-with-inp-err.js";
import { ddTaylorShiftWithInpErr } from "./dd-taylor-shift-with-inp-err.js";
import { ddInplaceScaleWithInpErr } from "../../change-variables/double-double/dd-scale-with-inp-err.js";

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
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 * 
 * @internal
 */
function mobiusPrecise(
        p: number[],
        p_: number[],
        pDd: number[][],
        pDd_: number[]) {

    return function mobiusPrecise_(
            a: number,
            b: number,
            A: number,
            B: number): number {

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

        let numSignChanges = 0;  // number of sign changes
        let numUncertifyable = 0;  // number of coefficients who's sign cannot be certified
        // The sign of `A` and `B` are both !== 0 and is certified since it is an
        // endpoint of the interval.
        let _s = sign(A);  // No error in the sign
        for (let i=1; i<q.length; i++) {
            const err = q_[i]*γ1;
            const v = q[i];
            if ((abs(v) - err <= 0) && (i !== q.length - 1)) {
                // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
                // we are actually allowed one uncertifyable coefficient (but **only** if numSignChanges
                // equals 1)!
                numUncertifyable++;
            }

            // No error in the sign of the last coefficient (important for parity of sign changes)
            const s = i !== q.length - 1 ? sign(q[i]) : sign(B);
            if (s !== _s && s !== 0) {
                numSignChanges++;
                _s = s;
            }
        }

        if (numUncertifyable === 0) {
            return numSignChanges;  // guaranteed
        }

        if (numUncertifyable === 1 && numSignChanges === 1) {
            return 1;  // guaranteed to have exactly one root in the interval
        }

        return ddMobius(pDd, pDd_, a, b, A, B);
    }
}


function ddMobius(
        pDd: number[][],
        pDd_: number[],
        a: number,
        b: number,
        A: number,
        B: number): number {

    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    // let q = ddTaylorShift(pDd, a);
    let [q,q_] = ddTaylorShiftWithInpErr(pDd, a, pDd_);

    //---------------------------------------------------
    // Scale the coefficient of xⁱ by (b - a)ⁱ
    //---------------------------------------------------
    ddInplaceScaleWithInpErr(q, b - a, q_);

    //-------------------------------------------------------------
    // Reverse, i.e. xⁿ q(1/x) (homogenized inversion x -> 1/x)
    //-------------------------------------------------------------
    q.reverse();

    //-------------------------------------------
    // S₁: Taylor shift by 1, i.e. q(x + 1)
    //-------------------------------------------
    [q,q_] = ddTaylorShiftWithInpErr(q, 1, q_);


    let numSignChanges = 0;  // number of sign changes
    let numUncertifyable = 0;  // number of coefficients who's sign cannot be certified
    // The sign of `A` and `B` are both !== 0 and is certified since it is an
    // endpoint of the interval.
    let _s = sign(A);
    for (let i=0; i<q.length; i++) {
        const err = q_[i]*γγ3;
        const c = q[i];

        // abs(c[1]);//?
        // err;//?
        if ((abs(c[1]) - err <= 0) && (i !== q.length - 1)) {
            // console.log('very hard case');

            // Important: Lemma 19 of Sagraloff & Mehlhorn 2015 (arXiv:1308.4088) is incorrect,
            // we are actually allowed one uncertifyable coefficient (but **only** if `numSignChanges`
            // equals 1)!
            numUncertifyable++;
        }

        // No error in the sign of the last coefficient (important for parity of sign changes)
        const s = i !== q.length - 1 ? sign(q[i][1]) : sign(B);
        if (s !== _s && s !== 0) {
            numSignChanges++;
            _s = s;
        }
    }

    if (numUncertifyable === 0) {
        return numSignChanges;  // guaranteed
    }

    if (numUncertifyable === 1 && numSignChanges === 1) {
        return 1;  // guaranteed to have exactly one root in the interval
    }

    // We need to split the interval into two subintervals since we
    // cannot guarantee the number of sign changes in the Mobius coefficients.
    // But, the sign of `A` and `B` are both !== 0 and certified we *can* certify
    // the parity of the number of sign changes!

    // the negative sign indicates that the number of sign changes is not
    // guaranteed, but the parity is guaranteed
    return -numSignChanges;
}


export { mobiusPrecise }
