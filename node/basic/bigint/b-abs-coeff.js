/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bAbsCoeff(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        const v = p[i];
        p_[i] = v < 0n ? -v : v;
    }
    return p_;
}
export { bAbsCoeff };
//# sourceMappingURL=b-abs-coeff.js.map