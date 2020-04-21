"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the p-infinity norm, i.e. the maximum magnitude absolute value within
 * the given array of coefficients.
 */
function pInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        let v = Math.abs(p[i]);
        if (v > max) {
            max = v;
        }
    }
    return max;
}
exports.pInfNorm = pInfNorm;
/**
 * Returns the absolute value of the highest coefficient of the polynomial.
 * @param p a polynomial.
 */
function expPInfNorm(p) {
    let max = [0];
    for (let i = 0; i < p.length; i++) {
        let v = flo_numerical_1.abs(p[i]);
        if (flo_numerical_1.compare(v, max) > 0) {
            max = v;
        }
    }
    return max;
}
//# sourceMappingURL=p-inf-norm.js.map