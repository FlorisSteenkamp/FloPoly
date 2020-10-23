"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.content = void 0;
const integer_gcd_1 = require("../../gcd/double/integer-gcd");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const gcdInts = integer_gcd_1.gcdInts;
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
 * * **precondition** p must have integer coefficients, else use e.g. `scaleFloatsToInts`
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power, e.g.
 * `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 */
function content(p) {
    if (p.length === 0) {
        // the zero polynomial
        return 1;
    }
    return Math.sign(p[0]) * gcdInts(p);
}
exports.content = content;
//# sourceMappingURL=content.js.map