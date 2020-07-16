"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absCoeff = void 0;
/**
 * Returns the polynomial with all coeffients made positive of the given
 * polynomial
 */
function absCoeff(p) {
    let p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(Math.abs(p[i]));
    }
    return p_;
}
exports.absCoeff = absCoeff;
//# sourceMappingURL=abs-coeff.js.map