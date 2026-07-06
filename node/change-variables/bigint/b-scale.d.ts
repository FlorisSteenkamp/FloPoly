declare const bChangeVariablesScale: typeof bScale;
/**
* Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`.
*
* @param p a polynomial with coefficients given densely as an array of bigint
* numbers from highest to lowest power, e.g. `[5n,-3n,0n]`
* represents the polynomial `5x^2 - 3x`
* @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
*
* @example
* ```typescript
* bScale([1n,2n,7n], 3n); //=> [9n, 6n, 7n]
* ```
*
* @doc
*/
declare function bScale(p: bigint[], s: bigint): bigint[];
/**
 * Returns the polynomial `p((1/s)·x)`, i.e. the coefficient of `xⁱ` scaled by `(1/s)ⁱ`.
 *
 * * it is assumed that all coefficients are exactly divisible by `s`.
 *
 * @param p a polynomial with coefficients given densely as an array of bigint
 * numbers from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `s` in `p(x) <- p((1/s)x)`
 *
 * @example
 * ```typescript
 * bInvScale([16n, 8n, 7n], 4n); //=> [1n, 2n, 7n]
 * ```
 *
 * @doc
 */
declare function bInvScale(p: bigint[], s: bigint): bigint[];
export { bScale, bInvScale, bChangeVariablesScale };
