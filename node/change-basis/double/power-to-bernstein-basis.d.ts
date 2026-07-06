/**
 * Returns the Bernstein basis representation on the interval `[a,b]` from
 * the given power (monomial) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the lower bound of the Bernstein basis interval (default `0`)
 * @param b the upper bound of the Bernstein basis interval (default `1`)
 *
 * @doc
 */
declare function powerToBernsteinBasis(p: number[], a?: number, b?: number): number[];
export { powerToBernsteinBasis };
