/**
 * Returns the value of the polynomial `p` evaluated at `x` along with an
 * error bound on the result that has **NOT** yet been scaled by `γγ(3)`.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double floating point numbers from highest to lowest power,
 * e.g. `[[0,5],[0,-3],[0,0]]`  represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param p_ an error polynomial that provides a coefficient-wise error bound
 * on the input polynomial **NOT** yet scaled by `γγ(3)`
 */
declare function ddHornerWithInpError(p: number[][], x: number, p_: number[]): [number[], number];
export { ddHornerWithInpError };
