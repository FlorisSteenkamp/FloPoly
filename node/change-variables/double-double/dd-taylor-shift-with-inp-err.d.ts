/**
 * Returns the Taylor shift `f(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds that
 * has **not** been scaled by `γγ(3)` yet.
 *
 * * intermediate calculations are performed in double-double precision floating
 *   point arithmetic and the result is returned in double-double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double-double
 * precision floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 */
declare function ddTaylorShiftWithInpErr(p: number[][], h: number, p_: number[]): [number[][], number[]];
export { ddTaylorShiftWithInpErr };
