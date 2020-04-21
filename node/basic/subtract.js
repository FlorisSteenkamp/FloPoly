"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_leading_zeros_1 = require("./remove-leading-zeros");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns an approximate result of subtracting the second polynomial from first (p1 - p2).
 * @param p1 the polynomial from which will be subtracted
 * @param p2 the polynomial that will be subtracted
 * @example
 * subtract([2,3],[4,4]); //=> [-2, -1]
 */
function subtract(p1, p2) {
    // Initialize result array  
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let Δd = d1 - d2;
    let Δd1 = 0;
    let Δd2 = 0;
    if (Δd > 0) {
        Δd2 = -Δd;
    }
    else if (Δd < 0) {
        Δd1 = +Δd;
    }
    let d = Math.max(d1, d2);
    // Add coefficients
    let result = [];
    for (let i = 0; i < d + 1; i++) {
        let c1 = p1[i + Δd1] || 0;
        let c2 = p2[i + Δd2] || 0;
        result.push(c1 - c2);
    }
    // Ensure the result is a valid polynomial representation
    return remove_leading_zeros_1.removeLeadingZeros(result);
}
exports.subtract = subtract;
/**
 * Returns the exact result of subtracting the second polynomial from first (p1 - p2).
 * @param p1 the polynomial from which will be subtracted
 * @param p2 the polynomial that will be subtracted
 * @example
 * subtract([[2],[3]],[[4],[4]]); //=> [[-2], [-1]]
 */
function subtractExact(p1, p2) {
    // Initialize result array  
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let Δd = d1 - d2;
    let Δd1 = 0;
    let Δd2 = 0;
    if (Δd > 0) {
        Δd2 = -Δd;
    }
    else if (Δd < 0) {
        Δd1 = +Δd;
    }
    let d = Math.max(d1, d2);
    // Add coefficients
    let result = [];
    for (let i = 0; i < d + 1; i++) {
        let c1 = p1[i + Δd1] || [0];
        let c2 = p2[i + Δd2] || [0];
        result.push(flo_numerical_1.expansionDiff(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return remove_leading_zeros_1.expRemoveLeadingZeros(result);
}
exports.subtractExact = subtractExact;
//# sourceMappingURL=subtract.js.map