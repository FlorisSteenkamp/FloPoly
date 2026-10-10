import { removeLeadingZeros } from '../../basic/double/remove-leading-zeros.js';
/**
 * Returns the quotient and remainder of Euclidean long division of `a` by `b`
 * over double coefficients, i.e. `a = b*q + r` with `degree(r) < degree(b)`.
 *
 * * the leading term of the running remainder is eliminated explicitly at
 *   each step (it is not relied upon to cancel exactly in floating point)
 *
 * * leading zero coefficients of `a` and `b` are ignored
 *
 * @param a dividend polynomial (highest to lowest power)
 * @param b divisor polynomial (highest to lowest power)
 */
function divmod(a, b) {
    b = removeLeadingZeros(b);
    if (b.length === 0) {
        throw new Error('division by zero polynomial');
    }
    let r = removeLeadingZeros(a);
    const d = b.length - 1; // degree of `b`
    const c = b[0]; // leading coefficient of `b`
    const qLen = r.length - d; // degree(a) - degree(b) + 1
    if (qLen <= 0) {
        return { q: [], r };
    }
    const q = new Array(qLen).fill(0);
    while (true) {
        const deg = r.length - 1 - d; // degree of the current quotient term
        if (deg < 0) {
            break;
        }
        const coeff = r[0] / c;
        q[qLen - 1 - deg] = coeff;
        // r <- r - coeff*x^deg*b, dropping the (cancelling) leading term
        // explicitly
        const r_ = new Array(r.length - 1);
        for (let i = 1; i < r.length; i++) {
            r_[i - 1] = i <= d ? r[i] - coeff * b[i] : r[i];
        }
        r = removeLeadingZeros(r_);
    }
    return { q: removeLeadingZeros(q), r };
}
export { divmod };
//# sourceMappingURL=divmod.js.map