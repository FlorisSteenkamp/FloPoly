"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatToBigint = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = big_float_ts_1.exponent;
const bitLength = big_float_ts_2.bitLength;
const b0 = 0n; // temp until support is better otherwise test fails
/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes a bigint - the smallest such integer is returned.
 *
 * @param a a double precision floating point number
 */
function scaleFloatToBigint(a) {
    if (a === 0) {
        return b0;
    }
    return BigInt(a * 2 ** (-exponent(a) + bitLength(a) - 1));
}
exports.scaleFloatToBigint = scaleFloatToBigint;
//# sourceMappingURL=scale-float-to-bigint.js.map