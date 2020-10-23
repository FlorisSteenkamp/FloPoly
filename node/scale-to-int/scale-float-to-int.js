"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatToInt = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = big_float_ts_1.exponent;
const bitLength = big_float_ts_2.bitLength;
/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer (overflow not possible) - the smallest such integer is
 * returned.
 *
 * * the result is exact (no round-off can occur)
 *
 * @param a a double precision floating point number
 */
function scaleFloatToInt(a) {
    if (a === 0) {
        return 0;
    }
    return a * 2 ** (-exponent(a) + bitLength(a) - 1);
}
exports.scaleFloatToInt = scaleFloatToInt;
//# sourceMappingURL=scale-float-to-int.js.map