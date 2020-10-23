"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eHorner = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fes = big_float_ts_1.fastExpansionSum;
const sce = big_float_ts_1.scaleExpansion;
/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial using Horner's method - the result is returned as a
 * Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 */
function eHorner(p, x) {
    let q = [0];
    for (let i = 0; i < p.length; i++) {
        q = fes(p[i], sce(q, x));
    }
    return q;
}
exports.eHorner = eHorner;
//# sourceMappingURL=e-horner.js.map