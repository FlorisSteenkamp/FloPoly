"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absCoeff = void 0;
/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function absCoeff(p) {
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(Math.abs(p[i]));
    }
    return p_;
}
exports.absCoeff = absCoeff;
//# sourceMappingURL=abs-coeff.js.map