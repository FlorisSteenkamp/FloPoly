"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eContent = void 0;
const e_integer_gcd_1 = require("../../gcd/expansion/e-integer-gcd");
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eGcdInts = e_integer_gcd_1.eGcdInts;
const eSign = big_float_ts_1.eSign;
const eNegativeOf = big_float_ts_2.eNegativeOf;
/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the
 * greatest common divisor of its coefficients.
 *
 * * the sign is chosen such that dividing the polynomial by cont(p) will
 * always result in a positive leading coefficient
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eContent(p) {
    if (p.length === 0) {
        // the zero polynomial
        return [1];
    }
    return eSign(p[0]) < 0 ? eNegativeOf(eGcdInts(p)) : eGcdInts(p);
}
exports.eContent = eContent;
//# sourceMappingURL=e-content.js.map