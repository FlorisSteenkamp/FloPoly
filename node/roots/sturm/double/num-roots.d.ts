/**
 * Returns the *exact* number of *distinct* real roots in the open
 * interval `(-∞,+∞)` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1, 1, -64, 236, -240];
 * numRoots(p); //=> 4
 * ```
 *
 * @doc
 */
declare function numRoots(p: number[]): number;
export { numRoots };
