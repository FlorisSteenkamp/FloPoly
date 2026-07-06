/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * the (fast) modular algorithm.
 *
 * * `bGcdPrs` is faster in most cases
 *
 * @param a a polynomial with coefficients given densely as an array of
 * BigInts from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
declare function bGcdModular(a: bigint[], b: bigint[]): bigint[];
export { bGcdModular };
