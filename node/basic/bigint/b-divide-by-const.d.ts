/**
 * Divides (using **integer division**) a polynomial by a constant.
 *
 * * leading zero coefficients (possible since the division truncates) are
 *   removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param c a constant
 *
 * @doc
 */
declare function bDivideByConst(p: bigint[], c: bigint): bigint[];
export { bDivideByConst };
