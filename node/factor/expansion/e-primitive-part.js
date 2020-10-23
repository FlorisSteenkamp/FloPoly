"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePrimitivePart = void 0;
const e_content_1 = require("./e-content");
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eContent = e_content_1.eContent;
const eDiv = big_float_ts_1.eDiv;
/**
 * Returns the primitive part of the given polynomial.
 *
 * * the sign is chosen such that the leading term coefficient is positive
 *
 * * see e.g. [Factorization of polynomials](https://en.wikipedia.org/wiki/Factorization_of_polynomials)
 *
 * * example: let `p = -10x² + 5x + 5 = (-5)(2x² - x - 1)` so that `-5` is the
 * content of `p` and `2x² - x - 1` is its primitive part.
 *
 * @param a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 */
function ePrimitivePart(p) {
    let c = eContent(p);
    let p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(eDiv(p[i], c, 0));
    }
    return p_;
}
exports.ePrimitivePart = ePrimitivePart;
//# sourceMappingURL=e-primitive-part.js.map