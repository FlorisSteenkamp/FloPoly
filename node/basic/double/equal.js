"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = void 0;
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients,
 * false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * @example
 * equal([1,2,3,4], [1,2,3,4]);   //=> true
 * equal([1,2,3,4], [1,2,3,4,5]); //=> false
 */
function equal(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (p1[i] !== p2[i]) {
            return false;
        }
    }
    return true;
}
exports.equal = equal;
//# sourceMappingURL=equal.js.map