const { abs } = Math;
/**
 * Returns the Taylor shift `p(x + h)` of the given polynomial computed in
 * `O(n^2)` via repeated synthetic division by `(x - h)` (Horner's scheme)
 * including a **running** error bound based on the input error bounds.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function taylorShiftWithInpErr(p, h, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + h)`.
    const _h = abs(h);
    const q = p.slice();
    const q_ = p_.slice();
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            const qi1 = q[i - 1];
            const qi1_ = q_[i - 1];
            const hq = h * qi1;
            const hq_ = _h * qi1_ + abs(hq);
            q[i] = q[i] + hq;
            q_[i] = q_[i] + hq_ + abs(q[i]);
        }
    }
    return [q, q_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(x + 1)` together with a running error bound.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param h the shift amount
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function inplaceTaylorShiftBy1WithInpErr(p, p_) {
    const n = p.length - 1;
    // The successive remainders are the Taylor coefficients of `p` about `h`,
    // i.e. the coefficients of `p(x + 1)`.
    for (let k = 0; k <= n; k++) {
        for (let i = 1; i <= n - k; i++) {
            const qi1 = p[i - 1];
            const qi1_ = p_[i - 1];
            const hq_ = qi1_ + abs(qi1);
            p[i] = p[i] + qi1;
            p_[i] = p_[i] + hq_ + abs(p[i]);
        }
    }
}
export { taylorShiftWithInpErr, inplaceTaylorShiftBy1WithInpErr };
//# sourceMappingURL=taylor-shift-with-inp-err.js.map