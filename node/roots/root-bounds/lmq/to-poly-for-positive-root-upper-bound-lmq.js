const { abs } = Math;
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
function toPolyForPositiveRootUpperBound_LMQ(p, p_) {
    if (p.length !== p_.length) {
        throw new Error('`p` and `p_` must be of equal length.');
    }
    const q = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        q[i] = p[i] - abs(p_[i]);
    }
    return q;
}
export { toPolyForPositiveRootUpperBound_LMQ };
//# sourceMappingURL=to-poly-for-positive-root-upper-bound-lmq.js.map