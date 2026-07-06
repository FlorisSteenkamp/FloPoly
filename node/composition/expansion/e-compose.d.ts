/**
 * Returns the polynomial composition `p(q(x))` over expansion coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
declare function eCompose(p: number[][], q: number[][]): number[][];
export { eCompose };
