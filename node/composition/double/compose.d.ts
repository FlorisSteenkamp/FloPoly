/**
 * Returns the polynomial composition `p(q(x))` over double coefficients.
 *
 * @param p outer polynomial (highest to lowest power)
 * @param q inner polynomial (highest to lowest power)
 */
declare function compose(p: number[], q: number[]): number[];
export { compose };
