"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns true if the given polynomial is the zero polynomial
 * @param a a polynomial
 */
function expIsZero(a) {
    return a.length === 0 || (a.length === 1 && flo_numerical_1.sign(a[0]) === 0);
}
exports.expIsZero = expIsZero;
//# sourceMappingURL=is-zero.js.map