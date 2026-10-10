/**
 * Returns `true` if the polynomial `b` divides the polynomial `a` (over the
 * integers), i.e. if there exists a polynomial `r` (with integer
 * coefficients) such that `a = b*r`.
 *
 * * **note** the parameter order: the divisor `b` comes first
 *
 * @param b the divisor; a polynomial with coefficients given densely as an
 * array of bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the dividend; another polynomial
 *
 * @example
 * ```typescript
 * bDivides([2n,2n], [4n,0n,-4n]);  //=> true   (2x + 2 divides 4x^2 - 4)
 * bDivides([4n,0n,-4n], [2n,2n]);  //=> false
 * ```
 *
 * @doc
 */
declare function bDivides(b: bigint[], a: bigint[]): boolean;
export { bDivides };
