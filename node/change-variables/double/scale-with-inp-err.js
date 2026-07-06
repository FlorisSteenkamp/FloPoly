const { abs } = Math;
/**
 * Returns the polynomial `p(a·x)`, i.e. the coefficient of `xⁱ` scaled by `aⁱ`
 * in double precision inlcuding an error bound that has **not** been scaled
 * by `γ1` yet.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a scaling factor, i.e. the `a` in `p(x) <- p(ax)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @example
 * ```typescript
 * changeVariablesScale([1,2,7], 3); //=> [9, 6, 7]
 * ```
 *
 * @doc
 */
function scaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return [[], []];
    }
    const r = new Array(n + 1);
    const r_ = new Array(n + 1);
    r[n] = p[n];
    r_[n] = p_[n];
    let sPow = s;
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = abs(pn_i);
        const pn_i_ = p_[j];
        const absRn_i = _pn_i * sPow;
        r[j] = pn_i * sPow;
        r_[j] = pn_i_ * sPow + _pn_i * sPow_ + absRn_i;
        sPow = sPow * s;
        sPow_ = sPow_ * s + sPow; // `s` is required to be positive
    }
    return [r, r_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
 *
 * * **Note**: `s` must be positive, otherwise the error bound will be
 *   incorrect.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @doc
 */
function inplaceScaleWithInpErr(p, s, p_) {
    const n = p.length - 1;
    if (n < 0) {
        return;
    }
    let sPow = s;
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = abs(pn_i);
        const pn_i_ = p_[j];
        const scaledPn_i = pn_i * sPow;
        p[j] = scaledPn_i;
        p_[j] = pn_i_ * sPow + _pn_i * sPow_ + abs(scaledPn_i);
        const nextSPow = sPow * s;
        sPow_ = sPow_ * s + nextSPow; // `s` is required to be positive
        sPow = nextSPow;
    }
}
export { scaleWithInpErr, inplaceScaleWithInpErr };
//# sourceMappingURL=scale-with-inp-err.js.map