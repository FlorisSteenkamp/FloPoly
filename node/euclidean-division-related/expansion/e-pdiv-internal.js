"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePdivInternal = void 0;
const big_float_ts_1 = require("big-float-ts");
const e_degree_1 = require("../../basic/expansion/e-degree");
const e_elevate_degree_1 = require("./e-elevate-degree");
const e_add_1 = require("../../basic/expansion/e-add");
const e_multiply_1 = require("../../basic/expansion/e-multiply");
const e_subtract_1 = require("../../basic/expansion/e-subtract");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDiv = big_float_ts_1.eDiv;
const eDegree = e_degree_1.eDegree;
const eElevateDegree = e_elevate_degree_1.eElevateDegree;
const eAdd = e_add_1.eAdd;
const eMultiply = e_multiply_1.eMultiply;
const subtractExact = e_subtract_1.eSubtract;
/**
 * Returns the `quotient` and `remainder` of the pseudo division of `a/b` (a, b
 * both being polynomials) naively, i.e. in such a way that all intermediate
 * calculations and the final result are **not** guaranteed to be in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns `q` and `r` in the formula `a = bq + r`,
 * where `degree(r) < degree(b)`. `q` is called the quotient and `r` the
 * remainder.
 *
 * * **precondition:** the coefficients must be integers; if they are not they
 * can easily be scaled from floating point numbers to integers by calling
 * `scaleFloatsToBigints` or similar before calling this function (recall that
 * all floating point numbers are rational).
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 *
 * @param a the polynomial a in the formula a = bq + r
 * @param b the polynomial b in the formula a = bq + r
 */
function ePdivInternal(a, b) {
    let q = [];
    const d = eDegree(b);
    const c = b[0];
    let r = a;
    while (true) {
        const deg = eDegree(r) - d;
        if (deg < 0) {
            return { q, r };
        }
        // The division below is guaranteed to be exact
        let s = [eDiv(r[0], c, 0)];
        s = eElevateDegree(s, deg);
        q = eAdd(q, s);
        r = subtractExact(r, eMultiply(s, b));
    }
}
exports.ePdivInternal = ePdivInternal;
//# sourceMappingURL=e-pdiv-internal.js.map