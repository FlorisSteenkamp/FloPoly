/**
 * Returns the polynomial composition `p(q(x))` over bigint coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
declare function bCompose(p: bigint[], q: bigint[]): bigint[];
export { bCompose };
