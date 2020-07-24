"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerExact = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fes = big_float_ts_1.fastExpansionSum;
const sce = big_float_ts_1.scaleExpansion;
const est = big_float_ts_1.eEstimate;
/**
 * Returns the exact result of evaluating a univariate polynomial (with
 * coefficients being double floating point expansions) using Horner's method.
 */
function HornerExact(p, x) {
    let q = p[0];
    for (let i = 1; i < p.length; i++) {
        q = fes(p[i], sce(q, x));
    }
    return q;
}
exports.HornerExact = HornerExact;
//# sourceMappingURL=horner-exact.js.map