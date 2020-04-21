"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate result of evaluating the given polynomial at 1 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 */
function evaluateAt1(p) {
    let res = 0;
    for (let i = 0; i < p.length; i++) {
        res += p[i];
    }
    return res;
}
exports.evaluateAt1 = evaluateAt1;
/**
 * Returns the exact result of evaluating the given polynomial at 1 - it
 * is much faster than at an arbitrary point.
 * @param p a polynomial
 */
function expEvaluateAt1(p) {
    let res = p[0];
    for (let i = 1; i < p.length; i++) {
        res = flo_numerical_1.fastExpansionSum(res, p[i]);
    }
    return res;
}
exports.expEvaluateAt1 = expEvaluateAt1;
//# sourceMappingURL=evaluate-at-1.js.map