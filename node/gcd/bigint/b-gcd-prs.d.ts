/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs).
 *
 * * the returned polynomial is the gcd up to a (non-zero) constant multiple,
 *   e.g. `[4n]` or `[3n,3n]` may be returned for a gcd of `1` or `x + 1`
 *   respectively - use [[bPrimitivePart]] to normalize it
 *
 * * the modular GCD algorithm, [[bGcdModular]], can also be used; it should
 *   be faster for high degree polynomials or when `bGcdPrs` encounters pathological
 *   cases. However, `bGcdPrs` is faster in general.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
declare function bGcdPrs(a: bigint[], b: bigint[]): bigint[];
export { bGcdPrs };
