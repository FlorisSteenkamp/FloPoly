"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatssToIntss = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = big_float_ts_1.exponent;
const bitLength = big_float_ts_2.bitLength;
/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 */
function scaleFloatssToIntss(ass) {
    let e = -1024;
    for (let i = 0; i < ass.length; i++) {
        const c = ass[i];
        for (let j = 0; j < c.length; j++) {
            const a = c[j];
            if (a === 0) {
                continue;
            }
            const scaleFactor = -exponent(a) + bitLength(a) - 1;
            if (scaleFactor > e) {
                e = scaleFactor;
            }
        }
    }
    return ass.map(as => as.map(a => a * 2 ** e));
}
exports.scaleFloatssToIntss = scaleFloatssToIntss;
//# sourceMappingURL=scale-floatss-to-intss.js.map