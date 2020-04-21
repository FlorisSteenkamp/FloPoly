"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial
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
/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial with coefficients given as floatin point expansions
 * @param p2 another polynomial
 * @example
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4]]);   //=> true
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 */
function expEqual(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (flo_numerical_1.compare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.expEqual = expEqual;
//# sourceMappingURL=equal.js.map