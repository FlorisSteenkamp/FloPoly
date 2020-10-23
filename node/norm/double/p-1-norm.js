"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p1Norm = void 0;
/**
 * Returns the `p-1 norm`, a.k.a. `Taxicab norm`, i.e. the sum of the absolute
 * values of the given array of numbers (with intermediate calculations done
 * in double precision).
 *
 * * if the array of numbers represent polynomial coefficients then the p-1
 * norm is known as the `length` of the polynomial
 *
 * @param p an array of numbers
 */
function p1Norm(p) {
    let s = 0;
    for (let i = 0; i < p.length; i++) {
        s += Math.abs(p[i]);
    }
    return s;
}
exports.p1Norm = p1Norm;
//# sourceMappingURL=p-1-norm.js.map