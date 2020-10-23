"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatsToInts = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = big_float_ts_1.exponent;
const bitLength = big_float_ts_2.bitLength;
/**
 * Returns the result of scaling the given floats by the *same* power of two
 * such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can)
 * * can be used to scale polynomials or Shewchuk expansions
 *
 * @param as an array of double precision floating point numbers
 */
function scaleFloatsToInts(as) {
    let e = -1024;
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scaleFactor = -exponent(a) + bitLength(a) - 1;
        if (scaleFactor > e) {
            e = scaleFactor;
        }
    }
    return as.map(a => a * 2 ** e);
}
exports.scaleFloatsToInts = scaleFloatsToInts;
//# sourceMappingURL=scale-floats-to-ints.js.map