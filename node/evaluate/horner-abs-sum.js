"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerAbsSum = void 0;
/**
 * @param p1
 * @param p2
 */
function HornerAbsSum(p1, p2, x) {
    let q = Math.abs(p1[0] + p2[0]);
    for (let i = 1; i < p1.length; i++) {
        q = Math.abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}
exports.HornerAbsSum = HornerAbsSum;
//# sourceMappingURL=horner-abs-sum.js.map