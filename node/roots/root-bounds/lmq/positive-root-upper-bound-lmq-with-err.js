import { positiveRootUpperBound_LMQ } from "./positive-root-upper-bound-lmq.js";
import { toPolyForPositiveRootUpperBound_LMQ } from "./to-poly-for-positive-root-upper-bound-lmq.js";
import { negate } from "../../../basic/double/negate.js";
const { abs } = Math;
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
function positiveRootUpperBound_LMQ_WithError(p, p_) {
    if (p.length !== p_.length) {
        throw new Error('`p` and `p_` must be of equal length.');
    }
    // ignore exact leading zeros
    let i = 0;
    while (i < p.length && p[i] === 0 && p_[i] === 0) {
        i++;
    }
    if (i > 0) {
        p = p.slice(i);
        p_ = p_.slice(i);
    }
    if (p.length <= 1) {
        return 0; // a constant (or the zero polynomial)
    }
    const e0 = abs(p_[0]);
    if (p[0] - e0 > 0) {
        // the leading coefficient is certainly positive
    }
    else if (p[0] + e0 < 0) {
        // the leading coefficient is certainly negative - negate the entire
        // family (the absolute error bounds are unaffected)
        p = negate(p);
    }
    else {
        // the sign of the leading coefficient is uncertain
        return Infinity;
    }
    // `q` now has a positive leading coefficient
    return positiveRootUpperBound_LMQ(toPolyForPositiveRootUpperBound_LMQ(p, p_));
}
export { positiveRootUpperBound_LMQ_WithError };
//# sourceMappingURL=positive-root-upper-bound-lmq-with-err.js.map