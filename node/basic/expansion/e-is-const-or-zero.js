"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eIsConstOrZero = void 0;
/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk
 * floating point expansions) is a constant or the zero polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eIsConstOrZero(p) {
    return p.length <= 1;
}
exports.eIsConstOrZero = eIsConstOrZero;
//# sourceMappingURL=e-is-const-or-zero.js.map