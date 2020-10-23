"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bIsRationalMultipleOf = void 0;
const b_integer_gcd_1 = require("../../gcd/bigint/b-integer-gcd");
/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function bIsRationalMultipleOf(a, b) {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    // multiply by -1 if appropriate to make the leading coefficients positive
    const a_ = a[0] < 0n ? a.map(c => -c) : a;
    const b_ = b[0] < 0n ? b.map(c => -c) : b;
    /** leading coefficient of a */
    const lcA = a_[0];
    /** leading coefficient of b */
    const lcB = b_[0];
    const gcd = b_integer_gcd_1.bGcdInt(lcA, lcB);
    const A = lcA / gcd; // this division is exact
    const B = lcB / gcd; // this division is exact
    for (let i = 0; i < a_.length; i++) {
        const Ab = A * b_[i];
        if (Ab % B !== 0n) {
            return false;
        }
        if (Ab / B !== a_[i]) {
            return false;
        }
    }
    return true;
}
exports.bIsRationalMultipleOf = bIsRationalMultipleOf;
//# sourceMappingURL=b-is-rational-multiple-of.js.map