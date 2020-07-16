"use strict";
//import { eAbs, eCompare } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pInfNorm = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eAbs, eCompare } = big_float_ts_1.operators;
/**
 * Returns the p-infinity norm, i.e. the maximum magnitude absolute value within
 * the given array of coefficients.
 */
function pInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        let v = Math.abs(p[i]);
        if (v > max) {
            max = v;
        }
    }
    return max;
}
exports.pInfNorm = pInfNorm;
/**
 * Returns the absolute value of the highest coefficient of the polynomial.
 * @param p a polynomial.
 */
function expPInfNorm(p) {
    let max = [0];
    for (let i = 0; i < p.length; i++) {
        let v = eAbs(p[i]);
        if (eCompare(v, max) > 0) {
            max = v;
        }
    }
    return max;
}
//# sourceMappingURL=p-inf-norm.js.map