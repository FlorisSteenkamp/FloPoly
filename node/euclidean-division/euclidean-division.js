"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rem = void 0;
//import { eDiv } from "big-float-ts";
const degree_1 = require("../basic/degree");
const exp_elevate_degree_1 = require("./exp-elevate-degree");
const add_1 = require("../basic/add");
const multiply_1 = require("../basic/multiply");
const subtract_1 = require("../basic/subtract");
const remove_leading_zeros_1 = require("../basic/remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eDiv } = big_float_ts_1.operators;
const degree = degree_1.degree;
const expElevateDegree = exp_elevate_degree_1.expElevateDegree;
const addExact = add_1.addExact;
const multiplyExact = multiply_1.multiplyExact;
const subtractExact = subtract_1.subtractExact;
const expApproxRemoveLeadingZeros = remove_leading_zeros_1.expApproxRemoveLeadingZeros;
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
    let d = degree(b);
    let c = b[0];
    let r = a;
    while (true) {
        let deg = degree(r) - d;
        // The division below is guaranteed to be exact
        let s = [eDiv(r[0], c, 0)];
        s = expElevateDegree(s, deg);
        q = addExact(q, s);
        let m = multiplyExact([s, b]);
        let n = subtractExact(r, m);
        r = expApproxRemoveLeadingZeros(n);
        if (deg <= 0) {
            return { q, r };
        }
    }
}
exports.rem = rem;
//# sourceMappingURL=euclidean-division.js.map