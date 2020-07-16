"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horner = void 0;
/**
 * Returns the approximate result of evaluating a univariate polynomial using
 * Horner's method.
 */
function Horner(p, x) {
    let q = p[0];
    for (let i = 1; i < p.length; i++) {
        q = q * x + p[i];
    }
    return q;
}
exports.Horner = Horner;
//# sourceMappingURL=horner.js.map