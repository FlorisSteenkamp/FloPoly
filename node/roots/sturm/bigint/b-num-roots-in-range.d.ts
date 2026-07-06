/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20n,-11n);  //=> 0
 * bNumRootsInRange(p,-11n,-9n);   //=> 1
 * bNumRootsInRange(p,-11n,5n);    //=> 4
 * ```
 *
 * @doc
 */
declare function bNumRootsInRange(p: bigint[], a: bigint, b: bigint): number;
export { bNumRootsInRange };
