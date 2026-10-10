/**
 * Returns an upper bound for the positive real roots of *every* polynomial in
 * the family described by the given polynomial and its coefficient-wise
 * absolute error bounds using the LMQ bound.
 *
 * * for `x > 0` every polynomial `p̃` in the family satisfies `p̃(x) >= q(x)`
 *   where `q` has coefficients `p[i] - |p_[i]|` (see
 *   [[toPolyForPositiveRootUpperBound_LMQ]]); thus an upper bound on the
 *   positive roots of `q` (above which `q > 0`) is also an upper bound on the
 *   positive roots of every polynomial in the family
 *
 * * the sign of the leading coefficient must be certain: if it is certainly
 *   negative the family is negated first and if its sign is uncertain no finite
 *   bound exists and `Infinity` is returned
 *
 * * leading coefficients that are exactly zero *with* zero error are ignored
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds
 *
 * @doc
 */
declare function positiveRootUpperBound_LMQ_WithError(p: number[], p_: number[]): number;
export { positiveRootUpperBound_LMQ_WithError };
