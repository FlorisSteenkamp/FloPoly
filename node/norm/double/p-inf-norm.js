"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pInfNorm = void 0;
/**
 * Returns the `p-infinity norm`, i.e. the maximum magnitude absolute value
 * within the given array of numbers / coefficients (with intermediate
 * calculations done in double precision).
 *
 * @param p an array of numbers; can represent an array of polynomial
 * coefficients
 *
 * @doc
 */
function pInfNorm(p) {
    let max = 0;
    for (let i = 0; i < p.length; i++) {
        const v = Math.abs(p[i]);
        if (v > max) {
            max = v;
        }
    }
    return max;
}
exports.pInfNorm = pInfNorm;
//# sourceMappingURL=p-inf-norm.js.map