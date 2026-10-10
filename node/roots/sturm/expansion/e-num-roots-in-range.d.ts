/**
 * Returns the ***exact*** number of ***distinct*** real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once and roots at the endpoints
 *   `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound given as a Shewchuk expansion
 * @param b an upper bound given as a Shewchuk expansion
 *
 * @example
 * ```typescript
 * const p = [[1], [1], [-64], [236], [-240]];
 * eNumRootsInRange(p,[-20],[-11]); //=> 0
 * eNumRootsInRange(p,[-11],[-9]);  //=> 1
 * eNumRootsInRange(p,[-11],[3.5]); //=> 3
 * eNumRootsInRange(p,[-11],[5]);   //=> 4
 * ```
 *
 * @doc
 */
declare function eNumRootsInRange(p: number[][], a: number[], b: number[]): number;
export { eNumRootsInRange };
