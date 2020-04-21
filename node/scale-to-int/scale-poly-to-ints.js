"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the result of scaling the given floats by a power of two such that
 * all floats become integers - can be used to scale floating point expansions
 * and polynomials
 * @param a a floating point number
 */
function scalePolyToIntsExp(p) {
    let e = -1024;
    for (let i = 0; i < p.length; i++) {
        let c = p[i];
        for (let j = 0; j < c.length; j++) {
            let a = c[j];
            let scaleFactor = -flo_numerical_1.exponent(a) + flo_numerical_1.bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }
    return p.map(c => c.map(a => a * Math.pow(2, e)));
}
exports.scalePolyToIntsExp = scalePolyToIntsExp;
//# sourceMappingURL=scale-poly-to-ints.js.map