"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abs = Math.abs;
/**
 * Returns the approximate result of evaluating a univariate polynomial using
 * Horner's method and where the absolute value of each coefficient is taken.
 */
function AbsHorner(p, x) {
    let q = abs(p[0]);
    for (let i = 1; i < p.length; i++) {
        q = q * x + abs(p[i]);
    }
    return q;
}
exports.AbsHorner = AbsHorner;
//# sourceMappingURL=abs-horner.js.map