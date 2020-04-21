"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the result of scaling the given float by a power of two such that
 * it becomes an integer - the smallest such integer is returned.
 * @param a a floating point number
 */
function scaleFloatToInt(a) {
    return a * Math.pow(2, (-flo_numerical_1.exponent(a) + flo_numerical_1.bitLength(a) - 1));
}
exports.scaleFloatToInt = scaleFloatToInt;
//# sourceMappingURL=scale-float-to-int.js.map