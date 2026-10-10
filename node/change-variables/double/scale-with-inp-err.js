const { abs } = Math;
/**
 * Returns the polynomial `p(s·x)`, i.e. the coefficient of `xⁱ` scaled by `sⁱ`
 * in double precision including an error bound that has **not** been scaled
 * by `γ1` yet.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param s a scaling factor, i.e. the `s` in `p(x) <- p(sx)`
 * @param p_ an error polynomial that represents a coefficient-wise error bound
 * that has **not** been scaled by `γ1` yet
 *
 * @example
 * ```typescript
 * scaleWithInpErr([1,2,7], 3, [0,0,0]); //=> [[9, 6, 7], [18, 6, 0]]
 * ```
 *
 * @doc
 */
function scaleWithInpErr(p, s, p_) {
    const r = p.slice();
    const r_ = p_.slice();
    inplaceScaleWithInpErr(r, s, r_);
    return [r, r_];
}
/**
 * ❗**MODIFIES**❗ the given polynomial and its input-error bound to compute
 * `p(s·x)` together with a running error bound.
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
    const _s = abs(s);
    let sPow = s;
    let sPow_ = 0; // no error
    for (let i = 1; i <= n; i++) {
        const j = n - i;
        const pn_i = p[j];
        const _pn_i = abs(pn_i);
        const pn_i_ = p_[j];
        const scaledPn_i = pn_i * sPow;
        p[j] = scaledPn_i;
        // input error * |sⁱ| + |p| * err(sⁱ) + round-off of the product
        p_[j] = pn_i_ * abs(sPow) + _pn_i * sPow_ + abs(scaledPn_i);
        const nextSPow = sPow * s;
        sPow_ = sPow_ * _s + abs(nextSPow);
        sPow = nextSPow;
    }
}
export { scaleWithInpErr, inplaceScaleWithInpErr };
//# sourceMappingURL=scale-with-inp-err.js.map