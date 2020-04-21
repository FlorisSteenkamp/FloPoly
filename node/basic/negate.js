"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiply_by_const_1 = require("./multiply-by-const");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
function negate(p) {
    return multiply_by_const_1.multiplyByConst(-1, p);
}
exports.negate = negate;
/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * expNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 */
function expNegate(p) {
    let result = [];
    for (let i = 0; i < p.length; i++) {
        result.push(flo_numerical_1.negativeOf(p[i]));
    }
    return result;
}
exports.expNegate = expNegate;
//# sourceMappingURL=negate.js.map