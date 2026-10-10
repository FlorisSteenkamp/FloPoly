import { eCompress } from "big-float-ts";
import { eTaylorShift } from "./e-taylor-shift.js";
import { eScale } from "./e-scale.js";


/**
 * Applies a Mobius transformation to the given polynomial:
 * * `p(x) -> (x + 1)^n * p((ax + b) / (x + 1))`
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 * 
 * * the calculations are exact (the coefficients are Shewchuk expansions)
 * 
 * * the returned coefficient array has the same length as the given one, i.e.
 *   leading zero coefficients are **not** removed (the leading coefficient of
 *   the result equals `p(a)` and the constant term equals `p(b)`, so a leading
 *   zero indicates that `a` is a root) - consistent with [[mobius]]
 * 
 * * see [[mobius]] for a description of the algorithm
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 */
function eMobius(
        p: number[][],
        a: number,
        b: number): number[][] {

    //-------------------------------------------
    // Taylor shift by `a`, i.e. p(x + a)
    //-------------------------------------------
    let q = eTaylorShift(p, a);

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

    q = q.map(eCompress);

    return q;
}


export { eMobius }
