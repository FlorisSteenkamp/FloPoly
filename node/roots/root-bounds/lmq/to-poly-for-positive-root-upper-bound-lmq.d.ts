/**
 * Returns a new polynomial adjusted by coefficient-wise absolute error bounds
 * for use with `positiveRootUpperBound_LMQ`.
 *
 * For each coefficient `c` with absolute error bound `e`, the returned
 * coefficient is chosen from `[c - e, c + e]` as follows:
 * * if the coefficient is guaranteed positive (`c - e > 0`), return `c - e`
 *   (smallest guaranteed positive value)
 * * if the coefficient is guaranteed negative (`c + e < 0`), return `c - e`
 *   (most negative value)
 * * if the sign is uncertain (`c - e <= 0 <= c + e`), return `0`
 *
 * This yields a conservative representative polynomial for many practical
 * cases, while making sign-uncertain coefficients explicit.
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds; must have same length as `p`
 *
 * @doc
 */
declare function toPolyForPositiveRootUpperBound_LMQ(p: number[], p_: number[]): number[];
export { toPolyForPositiveRootUpperBound_LMQ };
