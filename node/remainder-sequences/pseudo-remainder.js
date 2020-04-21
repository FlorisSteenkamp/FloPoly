"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
const degree_1 = require("../basic/degree");
const multiply_by_const_1 = require("../basic/multiply-by-const");
const euclidean_division_1 = require("../euclidean-division/euclidean-division");
/**
 * Returns the trivial pseudo-remainder, i.e. with α === 1.
 *
 * The result could be in-exact in the presence of underflow.
 *
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * where a is first multiplied by leadingCoeff(b)^(deg(a)-deg(b)+1) so we can
 * guarantee exact divisions. Returns r in the formula a = bq + r, where
 * degree(r) < degree(b). q is called the quotient and r the remainder.
 *
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier if set then the multiplier leadingCoeff(b)^(deg(a)-deg(b)+1)
 * will be modified to abs(leadingCoeff(b)^(deg(a)-deg(b)+1))
 */
function prem(a, b, positiveMultiplier = false) {
    // change to pseudo-remainder, i.e. not simply r = a; this allows the 
    // remainders to stay in 'Z'
    // let m = leadingCoeff(b)^(deg(a)-deg(b)+1)
    let exponent = degree_1.degree(a) - degree_1.degree(b) + 1;
    let m = b[0];
    for (let i = 1; i < exponent; i++) {
        m = flo_numerical_1.expansionProduct(m, b[0]);
    }
    m = positiveMultiplier ? flo_numerical_1.abs(m) : m;
    let a_ = multiply_by_const_1.expMultiplyByConst(m, a);
    return euclidean_division_1.rem(a_, b);
}
exports.prem = prem;
//# sourceMappingURL=pseudo-remainder.js.map