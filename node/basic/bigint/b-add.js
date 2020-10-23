"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bAdd = void 0;
const b_remove_leading_zeros_1 = require("./b-remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bRemoveLeadingZeros = b_remove_leading_zeros_1.bRemoveLeadingZeros;
/**
 * Returns the result of adding two polynomials with bigint coefficients.
 *
 * @param p1 a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * bAdd([1n,2n,3n],[3n,4n]); //=> [1n,5n,7n]
 */
function bAdd(p1, p2) {
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
        const c1 = p1[i + Δd1] || 0n;
        const c2 = p2[i + Δd2] || 0n;
        result.push(c1 + c2);
    }
    // Ensure the result is a valid polynomial representation
    return bRemoveLeadingZeros(result);
}
exports.bAdd = bAdd;
//# sourceMappingURL=b-add.js.map