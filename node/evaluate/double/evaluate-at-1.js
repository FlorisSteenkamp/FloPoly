"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateAt1 = void 0;
/**
 * Returns the result of evaluating the given polynomial at 1 using double
 * precision for intermediate calculations.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function evaluateAt1(p) {
    let res = 0;
    for (let i = 0; i < p.length; i++) {
        res += p[i];
    }
    return res;
}
exports.evaluateAt1 = evaluateAt1;
//# sourceMappingURL=evaluate-at-1.js.map