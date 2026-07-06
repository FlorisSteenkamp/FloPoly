/**
 * Returns the Bernstein basis representation (in [0, 1]) from the given
 * power (monomial) basis.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`.
 *
 * @doc
 */
declare function powerToBernsteinBasis01(p: number[]): number[];
export { powerToBernsteinBasis01 };
