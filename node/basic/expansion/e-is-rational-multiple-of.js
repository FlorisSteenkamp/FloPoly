"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eIsRationalMultipleOf = void 0;
const big_float_ts_1 = require("big-float-ts");
const scale_floatss_to_intss_1 = require("../../scale-to-int/scale-floatss-to-intss");
const e_integer_gcd_1 = require("../../gcd/expansion/e-integer-gcd");
/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function eIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scale_floatss_to_intss_1.scaleFloatssToIntss(big_float_ts_1.eSign(a[0]) < 0 ? a.map(c => big_float_ts_1.eNegativeOf(c)) : a);
    const b_ = scale_floatss_to_intss_1.scaleFloatssToIntss(big_float_ts_1.eSign(b[0]) < 0 ? b.map(c => big_float_ts_1.eNegativeOf(c)) : b);
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = e_integer_gcd_1.eGcdInt(lcA, lcB);
    const A = big_float_ts_1.eIntDiv(lcA, gcd); // this division is exact
    const B = big_float_ts_1.eIntDiv(lcB, gcd); // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = big_float_ts_1.expansionProduct(A, b_[i]);
        const { div, rem } = big_float_ts_1.eLongDivide(Ab, B);
        if (big_float_ts_1.eSign(rem) !== 0) {
            return false;
        }
        if (big_float_ts_1.eCompare(div, a_[i]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.eIsRationalMultipleOf = eIsRationalMultipleOf;
//# sourceMappingURL=e-is-rational-multiple-of.js.map