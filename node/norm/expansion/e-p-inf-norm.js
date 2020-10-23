"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePInfNorm = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eEstimate = big_float_ts_1.eEstimate;
/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of numbers / coefficients (with intermediate
 * calculations (and the final result) done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 */
function ePInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        const v = Math.abs(eEstimate(p[i]));
        if (v > max) {
            max = v;
        }
    }
    return max;
}
exports.ePInfNorm = ePInfNorm;
//# sourceMappingURL=e-p-inf-norm.js.map