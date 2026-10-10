/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root in `[0,1]`, namely `1`.
 *
 * * roots at the endpoints `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bNumRootsIn01([1n, -4n, 5n, -2n]);  //=> 1  (the roots are 1 (double) and 2)
 * bNumRootsIn01([1n, 0n, 0n]);        //=> 1  (a double root at 0)
 * ```
 *
 * @doc
 */
declare function bNumRootsIn01(p: bigint[]): number;
export { bNumRootsIn01 };
