"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
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
        result = flo_numerical_1.fastExpansionSum(p[i], flo_numerical_1.expansionProduct(result, a));
    }
    return result;
}
exports.evaluateExact = evaluateExact;
//# sourceMappingURL=evaluate-exact.js.map