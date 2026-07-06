/**
 * Returns the value of the polynomial `p` evaluated at `x` along with an
 * error bound on the result that has **NOT** yet been scaled by `γ1`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * on the input polynomial **NOT** yet scaled by `γ1`
 */
declare function HornerWithInpError(p: number[], x: number, p_: number[]): [number, number];
export { HornerWithInpError };
