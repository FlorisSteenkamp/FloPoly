"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRationalMultipleOf = void 0;
const scale_floats_to_ints_1 = require("../../scale-to-int/scale-floats-to-ints");
const integer_gcd_1 = require("../../gcd/double/integer-gcd");
const big_float_ts_1 = require("big-float-ts");
/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 *
 * @doc
 */
function isRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scale_floats_to_ints_1.scaleFloatsToInts(a[0] < 0 ? a.map(c => -c) : a);
    const b_ = scale_floats_to_ints_1.scaleFloatsToInts(b[0] < 0 ? b.map(c => -c) : b);
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = integer_gcd_1.gcdInt(lcA, lcB);
    const A = lcA / gcd; // this division is exact
    const B = lcB / gcd; // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = big_float_ts_1.twoProduct(A, b_[i]);
        const { div, rem } = big_float_ts_1.eLongDivide(Ab, [B]);
        if (big_float_ts_1.eSign(rem) !== 0) {
            return false;
        }
        if (big_float_ts_1.eCompare(div, [a_[i]]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.isRationalMultipleOf = isRationalMultipleOf;
//# sourceMappingURL=is-rational-multiple-of.js.map