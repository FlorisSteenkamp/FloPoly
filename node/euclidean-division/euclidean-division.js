"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const degree_1 = require("../basic/degree");
const flo_numerical_1 = require("flo-numerical");
const exp_elevate_degree_1 = require("./exp-elevate-degree");
const add_1 = require("../basic/add");
const multiply_1 = require("../basic/multiply");
const subtract_1 = require("../basic/subtract");
const remove_leading_zeros_1 = require("../basic/remove-leading-zeros");
/**
 * Returns the Euclidean remainder.
 *
 * Performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns r in the formula a = bq + r, where degree(r) < degree(b). q is
 * called the quotient and r the remainder.
 *
 * A precondition is that b !== [0], i.e. unequal to the zero polynomial.
 * see https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 */
function rem(a, b) {
    let q = [];
    let d = degree_1.degree(b);
    let c = b[0];
    let r = a;
    while (true) {
        let deg = degree_1.degree(r) - d;
        // The division below is guaranteed to be exact
        let s = [flo_numerical_1.expansionDiv(r[0], c, 0)];
        s = exp_elevate_degree_1.expElevateDegree(s, deg);
        q = add_1.addExact(q, s);
        let m = multiply_1.multiplyExact([s, b]);
        let n = subtract_1.subtractExact(r, m);
        r = remove_leading_zeros_1.expApproxRemoveLeadingZeros(n);
        if (deg <= 0) {
            return { q, r };
        }
    }
}
exports.rem = rem;
//# sourceMappingURL=euclidean-division.js.map