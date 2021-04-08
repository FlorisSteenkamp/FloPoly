"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposePoly = void 0;
/**
 * Transposes the given polynomial (given with multi-precision coefficients)
 * into multiple polynomials with each consecutive polynomial 'adjusting'
 * the prior one to higher precision.
 *
 * @param p
 *
 * @internal
 */
function transposePoly(p) {
    // transpose the polynomial coefficients into multiple polynomials
    const len = p[0].length;
    const p_ = [];
    for (let i = 0; i < len; i++) {
        const _p = [];
        for (let j = 0; j < p.length; j++) {
            _p.push(p[j][len - (i + 1)]); // from highest to lowest
        }
        p_.push(_p);
    }
    return p_;
}
exports.transposePoly = transposePoly;
//# sourceMappingURL=transpose-poly.js.map