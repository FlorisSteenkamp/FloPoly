"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bEvaluateAt1 = void 0;
/**
 * Returns the exact result of evaluating the given polynomial at 1.
 *
 * * faster than at an arbitrary point.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function bEvaluateAt1(p) {
    let res = 0n;
    for (let i = 0; i < p.length; i++) {
        res += p[i];
    }
    return res;
}
exports.bEvaluateAt1 = bEvaluateAt1;
//# sourceMappingURL=b-evaluate-at-1.js.map