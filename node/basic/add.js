"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_leading_zeros_1 = require("./remove-leading-zeros");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate result of adding two polynomials.
 * @param p1 a polynomial
 * @param p2 another polynomial
 * @example
 * add([1,2,3],[3,4]); //=> [1,5,7]
 */
function add(p1, p2) {
    // Initialize result array  
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let Δd = d1 - d2;
    let Δd1 = Δd < 0 ? +Δd : 0;
    let Δd2 = Δd > 0 ? -Δd : 0;
    let d = Math.max(d1, d2);
    // Add coefficients
    let result = [];
    for (let i = 0; i < d + 1; i++) {
        let c1 = p1[i + Δd1] || 0;
        let c2 = p2[i + Δd2] || 0;
        result.push(c1 + c2);
    }
    // Ensure the result is a valid polynomial representation
    return remove_leading_zeros_1.removeLeadingZeros(result);
}
exports.add = add;
/**
 * Returns the exact result of adding two polynomials.
 * @param p1 a polynomial with floating point expansion coefficients
 * @param p2 another polynomial with floating point expansion coefficients
 * @example
 * add([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 */
function addExact(p1, p2) {
    // Initialize result array  
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let Δd = d1 - d2;
    let Δd1 = Δd < 0 ? +Δd : 0;
    let Δd2 = Δd > 0 ? -Δd : 0;
    let d = Math.max(d1, d2);
    // Add coefficients
    let result = [];
    for (let i = 0; i < d + 1; i++) {
        let c1 = p1[i + Δd1] || [0];
        let c2 = p2[i + Δd2] || [0];
        result.push(flo_numerical_1.fastExpansionSum(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return remove_leading_zeros_1.expRemoveLeadingZeros(result);
}
exports.addExact = addExact;
//# sourceMappingURL=add.js.map