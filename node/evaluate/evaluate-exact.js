"use strict";
//import { fastExpansionSum, expansionProduct } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateExact = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { fastExpansionSum, expansionProduct } = big_float_ts_1.operators;
/**
 * Returns the exact (bar underflow/overflow) result of evaluating a univariate
 * polynomial using Horner's method.
 * @param p
 * @param a
 */
function evaluateExact(p, a) {
    if (p.length === 0) {
        return [0];
    }
    let result = p[0];
    for (let i = 1; i < p.length; i++) {
        result = fastExpansionSum(p[i], expansionProduct(result, a));
    }
    return result;
}
exports.evaluateExact = evaluateExact;
//# sourceMappingURL=evaluate-exact.js.map