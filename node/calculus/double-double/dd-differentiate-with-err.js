"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddDifferentiateWithError = void 0;
const gamma_1 = require("../../error-analysis/gamma");
const double_double_1 = require("double-double");
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ddMultDouble2 = double_double_1.ddMultDouble2;
const eEstimate = big_float_ts_1.eEstimate;
const γγ3 = gamma_1.γγ(3);
/**
 * Returns the result (and resulting coefficient-wise error bound) of
 * differentiating the given polynomial (with coefficients given in
 * double-double precision) in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param pE the coefficient-wise error bound of the input polynomial
 */
function ddDifferentiateWithError(pWithErr) {
    const { p, pE } = pWithErr;
    const dp = [];
    const dpE = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        const deg = d - i;
        const c = ddMultDouble2(deg, p[i]);
        dp.push(c);
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        const extraErr = (deg & deg - 1) === 0 ? 0 : γγ3;
        const $c = eEstimate(c);
        dpE.push(
        //deg * (pE[i] + Math.abs($c)*extraErr)
        deg * pE[i] + Math.abs($c) * extraErr);
    }
    return { p: dp, pE: dpE };
}
exports.ddDifferentiateWithError = ddDifferentiateWithError;
//# sourceMappingURL=dd-differentiate-with-err.js.map