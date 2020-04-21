"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_leading_zeros_1 = require("./remove-leading-zeros");
const flo_numerical_1 = require("flo-numerical");
/**
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]
 */
function multiplyByConst(c, p) {
    if (c === 0) {
        return [];
    }
    let d = p.length;
    let result = [];
    for (let i = 0; i < d; i++) {
        result.push(c * p[i]);
    }
    // We have to clip due to possible floating point underflow
    return remove_leading_zeros_1.removeLeadingZeros(result);
}
exports.multiplyByConst = multiplyByConst;
/**
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example
 * multiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]
 */
function expMultiplyByConst(c, p) {
    if (flo_numerical_1.sign(c) === 0) {
        return [[0]];
    }
    let d = p.length - 1;
    let result = [];
    for (let i = 0; i < d + 1; i++) {
        result.push(flo_numerical_1.expansionProduct(c, p[i]));
    }
    return result;
}
exports.expMultiplyByConst = expMultiplyByConst;
//# sourceMappingURL=multiply-by-const.js.map