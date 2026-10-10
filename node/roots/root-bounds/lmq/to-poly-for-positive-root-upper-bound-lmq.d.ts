/**
 * Returns a new polynomial, `q`, with coefficients `p[i] - |p_[i]|`, i.e. the
 * smallest possible value of each coefficient given the coefficient-wise
 * absolute error bounds, for use with `positiveRootUpperBound_LMQ`.
 *
 * * for `x > 0` every polynomial `p̃` in the family `|p̃[i] - p[i]| <= |p_[i]|`
 *   satisfies `p̃(x) >= q(x)`; thus if `q(x) > 0` for all `x > U` then so is
 *   `p̃(x)`, i.e. `U` is an upper bound on the positive roots of every `p̃`
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds; must have same length as `p`
 *
 * @doc
 */
declare function toPolyForPositiveRootUpperBound_LMQ(p: number[], p_: number[]): number[];
export { toPolyForPositiveRootUpperBound_LMQ };
