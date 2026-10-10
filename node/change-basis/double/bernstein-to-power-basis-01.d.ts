/**
 * Returns the power basis representation from the given
 * Bernstein (in [0,1]) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * * for degrees `> 56` the binomial coefficients used are no longer exactly
 *   representable in double precision (and the result is thus slightly less
 *   accurate) and degrees `> 60` are not supported (an error is thrown)
 *
 * @param p
 *
 */
declare function bernsteinToPowerBasis01(p: number[]): number[];
export { bernsteinToPowerBasis01 };
