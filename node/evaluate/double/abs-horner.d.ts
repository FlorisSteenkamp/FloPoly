/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method and where:
 *  1. the absolute value of each coefficient is taken
 *  2. the absolute value of `x` is taken
 *
 * * i.e. P(x) = ∑ᵢ₌₀ⁿ |aᵢ| |x|ⁱ
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which `p` should be evaluated
 *
 * @doc
 */
declare function AbsHorner(p: number[], x: number): number;
export { AbsHorner };
