"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eAdd = void 0;
const e_remove_leading_zeros_1 = require("./e-remove-leading-zeros");
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fastExpansionSum = big_float_ts_1.fastExpansionSum;
const eRemoveLeadingZeros = e_remove_leading_zeros_1.eRemoveLeadingZeros;
/**
 * Returns the exact result (bar underflow / overflow) of adding two
 * polynomials with coefficients given as Shewchuk floating point expansions.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * eAdd([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 */
function eAdd(p1, p2) {
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
        result.push(fastExpansionSum(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return eRemoveLeadingZeros(result);
}
exports.eAdd = eAdd;
//# sourceMappingURL=e-add.js.map