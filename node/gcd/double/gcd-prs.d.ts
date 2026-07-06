/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs) as `bigint`s.
 *
 * * the modular GCD algorithm, [[gcdModular]], can also be used; it should
 *   be faster for high degree polynomials or when `gcdPrs` encounters pathological
 *   cases. However, `gcdPrs` is faster in general.
 *
 * * since the final polynomial coefficients can be too large and overflow can
 *   occur in the **final** result is returned as a `bigint` coefficient polynomial
 *   (see `bLandauMignotteBound`).
 *
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @internal
 */
declare function gcdPrs(a: number[], b: number[]): bigint[];
export { gcdPrs };
