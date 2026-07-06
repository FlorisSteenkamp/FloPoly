/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials modulo
 * the given prime `p`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
declare function bGcdModP(a: bigint[], b: bigint[], p: bigint): bigint[];
export { bGcdModP };
