/**
 * Returns the power basis representation from the given Bernstein basis on
 * the interval `[a,b]`.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p the Bernstein coefficients `[b_0,...,b_n]`
 * @param a the lower bound of the Bernstein basis interval
 * @param b the upper bound of the Bernstein basis interval
 *
 */
declare function bernsteinToPowerBasis(p: number[], a?: number, b?: number): number[];
export { bernsteinToPowerBasis };
