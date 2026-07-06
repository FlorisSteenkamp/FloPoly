/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
declare function taylorShiftWithInpErr(p: number[], h: number, p_: number[]): [number[], number[]];
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(x + 1)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
declare function inplaceTaylorShiftBy1WithInpErr(p: number[], p_: number[]): void;
export { taylorShiftWithInpErr, inplaceTaylorShiftBy1WithInpErr };
