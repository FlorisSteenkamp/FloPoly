"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eEvaluateAt1 = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fastExpansionSum = big_float_ts_1.fastExpansionSum;
/**
 * Returns the exact result (bar underflow / overflow) of evaluating the given
 * polynomial at 1.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eEvaluateAt1(p) {
    let res = [0];
    for (let i = 0; i < p.length; i++) {
        res = fastExpansionSum(res, p[i]);
    }
    return res;
}
exports.eEvaluateAt1 = eEvaluateAt1;
//# sourceMappingURL=e-evaluate-at-1.js.map