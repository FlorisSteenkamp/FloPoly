"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSubtract = void 0;
const big_float_ts_1 = require("big-float-ts");
const e_remove_leading_zeros_1 = require("./e-remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDiff = big_float_ts_1.eDiff;
const eRemoveLeadingZeros = e_remove_leading_zeros_1.eRemoveLeadingZeros;
/**
 * Returns the exact result (bar underflow / overflow) of subtracting the
 * second polynomial from the first (both with coefficients given as Shewchuk
 * floating point expansions); (p1 - p2).
 *
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as Shewchuk floating point expansions
 * from highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 *
 * @example
 * eSubtract([[2],[3]],[[4],[4]]); //=> [[-2], [-1]]
 */
function eSubtract(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result.push(eDiff(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return eRemoveLeadingZeros(result);
}
exports.eSubtract = eSubtract;
//# sourceMappingURL=e-subtract.js.map