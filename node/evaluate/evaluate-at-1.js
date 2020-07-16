"use strict";
//import { fastExpansionSum } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expEvaluateAt1 = exports.evaluateAt1 = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { fastExpansionSum } = big_float_ts_1.operators;
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
        res = fastExpansionSum(res, p[i]);
    }
    return res;
}
exports.expEvaluateAt1 = expEvaluateAt1;
//# sourceMappingURL=evaluate-at-1.js.map