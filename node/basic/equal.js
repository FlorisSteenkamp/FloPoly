"use strict";
//import { eCompare } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expEqual = exports.equal = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eCompare } = big_float_ts_1.operators;
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
        if (eCompare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.expEqual = expEqual;
//# sourceMappingURL=equal.js.map