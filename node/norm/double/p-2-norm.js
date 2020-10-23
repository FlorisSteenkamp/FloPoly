"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p2Norm = void 0;
/**
 * Returns the `p-2 norm`, i.e. `Euclidean norm` of the given array of numbers
 * (with intermediate calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 */
function p2Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += p[i] ** 2;
    }
    return Math.sqrt(s);
}
exports.p2Norm = p2Norm;
//# sourceMappingURL=p-2-norm.js.map