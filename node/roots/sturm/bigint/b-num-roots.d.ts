/**
 * Returns the *exact* number of *distinct* real roots in the interval `(-∞,+∞)`
 * of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
declare function bNumRoots(p: bigint[]): number;
export { bNumRoots };
