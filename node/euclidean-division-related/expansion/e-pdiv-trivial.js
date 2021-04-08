"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePdivTrivial = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
const e_degree_1 = require("../../basic/expansion/e-degree");
const e_multiply_by_const_1 = require("../../basic/expansion/e-multiply-by-const");
const e_pdiv_internal_1 = require("./e-pdiv-internal");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDegree = e_degree_1.eDegree;
const eAbs = big_float_ts_1.eAbs;
const eIntPow = big_float_ts_2.eIntPow;
/**
 * Performs a **trivial pseudo-division** and returns the `quotient` and `remainder`
 * of the pseudo division of `a/b` (a, b both being polynomials) in such a way
 * that all intermediate calculations and the final result are done in ℤ, i.e.
 * performs Euclidean (i.e. long) division on the two given polynomials, a/b,
 * and returns a scaled `r` and `q` in the formula `a = bq + r`, where
 * `degree(r) < degree(b)`. `q` is called the quotient and `r` the remainder.
 *
 * * **precondition:** the coefficients must integers (and also Shewchuk
 * floating point expansions); if they are not they can easily be scaled from
 * floating point numbers to Shewchuk expansions by calling [[scaleFloatsToInts]]
 * or similar before calling this function (recall that all floating point
 * numbers are rational).
 *
 * * Intermediate calculations (and the input coefficients) are done in
 * infinite precision up to overlow (meaning integers can be represented
 * *exactly* up to `2^1024 === 1797...(300 more digits)...37216`) and may
 * thus not be applicable to very high degree polynomials (in which case it is
 * better to use [[bPdivTrivial]])
 *
 * * **precondition:** b !== [], i.e. unequal to the zero polynomial.
 *
 * * see [trivial pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 * * see also [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 * * see also [subresultant pseudo-remainder sequence](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Subresultant_pseudo-remainder_sequence)
 *
 * @param a the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of integer Shewchuk expansions from
 * highest to lowest power, e.g. `[[5],[-3],[0]]` represents the
 * polynomial `5x^2 - 3x`
 * @param b the polynomial b in the formula a = bq + r
 * @param positiveMultiplier defaults to false - if set to true then the
 * multiplier (of the coefficients of the dividend)
 * `leadingCoeff(b)^(deg(a)-deg(b)+1)` will be
 * modified to `abs(leadingCoeff(b)^(deg(a)-deg(b)+1))`
 *
 * @doc
 */
function ePdivTrivial(a, b, positiveMultiplier = false) {
    // change to pseudo-remainder, i.e. not simply r = a; this allows the 
    // remainders to stay in 'Z', i.e. let m = leadingCoeff(b)^(deg(a)-deg(b)+1)
    const d = eDegree(a) - eDegree(b) + 1;
    if (d < 1) {
        return { q: [], r: a };
    }
    let m = eIntPow(b[0], d);
    m = positiveMultiplier
        ? eAbs(m)
        : m;
    const a_ = e_multiply_by_const_1.eMultiplyByConst(m, a);
    return e_pdiv_internal_1.ePdivInternal(a_, b);
}
exports.ePdivTrivial = ePdivTrivial;
//# sourceMappingURL=e-pdiv-trivial.js.map