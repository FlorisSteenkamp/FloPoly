"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatssToBigintss = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = big_float_ts_1.exponent;
const bitLength = big_float_ts_2.bitLength;
const b0 = 0n; // so tests are not tripped up - awaiting better support
/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become bigints.
 *
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 */
function scaleFloatssToBigintss(ass) {
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
    // check for the trivial case
    if (e === 0) {
        return ass.map(as => as.map(a => BigInt(a)));
    }
    if (e > 0) {
        return ass.map(as => as.map(a => {
            if (a === 0) {
                return b0;
            }
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        }));
    }
    // overflow / underflow cannot occur
    return ass.map(as => as.map(a => BigInt(a * 2 ** e)));
}
exports.scaleFloatssToBigintss = scaleFloatssToBigintss;
//# sourceMappingURL=scale-floatss-to-bigintss.js.map