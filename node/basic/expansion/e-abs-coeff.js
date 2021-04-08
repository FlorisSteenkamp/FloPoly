"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eAbsCoeff = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eAbs = big_float_ts_1.eAbs;
/**
 * Returns the polynomial with all coeffients the absolute value of the given
 * polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eAbsCoeff(p) {
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(eAbs(p[i]));
    }
    return p_;
}
exports.eAbsCoeff = eAbsCoeff;
//# sourceMappingURL=e-abs-coeff.js.map