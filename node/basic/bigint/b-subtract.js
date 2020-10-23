"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bSubtract = void 0;
const b_remove_leading_zeros_1 = require("./b-remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bRemoveLeadingZeros = b_remove_leading_zeros_1.bRemoveLeadingZeros;
/**
 * Returns the result of subtracting the second polynomial from the first with
 * coefficients given as bigints; (p1 - p2).
 *
 * @param a minuend; the polynomial from which will be subtracted; a polynomial
 * with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 * @param b subtrahend; the polynomial that will be subtracted
 *
 * @example
 * bSubtract([2n,3n],[4n,4n]); //=> [-2n, -1n]
 */
function bSubtract(a, b) {
    // Initialize result array  
    const da = a.length - 1;
    const db = b.length - 1;
    const Δd = da - db;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const d = Math.max(da, db);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = a[i + Δd1] || 0n;
        const c2 = b[i + Δd2] || 0n;
        result.push(c1 - c2);
    }
    // Ensure the result is a valid polynomial representation
    return bRemoveLeadingZeros(result);
}
exports.bSubtract = bSubtract;
//# sourceMappingURL=b-subtract.js.map