"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the result of scaling the given floats by a power of two such that
 * all floats become integers - can be used to scale floating point expansions
 * and polynomials
 * @param a a floating point number
 */
function scaleFloatsToInts(as) {
    let e = -1024;
    for (let i = 0; i < as.length; i++) {
        let a = as[i];
        let scaleFactor = -flo_numerical_1.exponent(a) + flo_numerical_1.bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }
    return as.map(a => a * Math.pow(2, e));
}
exports.scaleFloatsToInts = scaleFloatsToInts;
//# sourceMappingURL=scale-floats-to-ints.js.map