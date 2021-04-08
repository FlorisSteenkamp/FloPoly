"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bAbsCoeff = void 0;
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
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        const v = p[i];
        p_.push(v < 0n ? -v : v);
    }
    return p_;
}
exports.bAbsCoeff = bAbsCoeff;
//# sourceMappingURL=b-abs-coeff.js.map