"use strict";
//import { exponent, bitLength } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleFloatToInt = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { exponent, bitLength } = big_float_ts_1.operators;
/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer - the smallest such integer is returned.
 * @param a a floating point number
 */
function scaleFloatToInt(a) {
    return a * Math.pow(2, (-exponent(a) + bitLength(a) - 1));
}
exports.scaleFloatToInt = scaleFloatToInt;
//# sourceMappingURL=scale-float-to-int.js.map