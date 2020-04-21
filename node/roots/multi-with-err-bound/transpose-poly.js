"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transposes the given polynomial coefficients into multiple polynomials.
 * @param p
 */
function transposePoly(p) {
    // transpose the polynomial coefficients into multiple polynomials
    let len = p[0].length;
    let p_ = [];
    for (let i = 0; i < len; i++) {
        let _p = [];
        for (let j = 0; j < p.length; j++) {
            _p.push(p[j][len - (i + 1)]); // from highest to lowest
        }
        p_.push(_p);
    }
    return p_;
}
exports.transposePoly = transposePoly;
//# sourceMappingURL=transpose-poly.js.map