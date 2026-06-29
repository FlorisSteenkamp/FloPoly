/**
 * Returns the negative of the given polynomial (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of double-dboule
 * floating point numbers from highest to lowest power
 *
 * @doc
 */
function ddNegate(p) {
    const p_ = new Array(p.length);
    for (let i = 0; i < p.length; i++) {
        p_[i] = [-p[i][0], -p[i][1]];
    }
    return p_;
}
export { ddNegate };
//# sourceMappingURL=dd-negate.js.map