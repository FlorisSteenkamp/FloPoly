"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerMultiAbsSum = void 0;
/**
 * @param p1
 * @param p2
 */
function HornerMultiAbsSum(p1, p2, p3, x) {
    let q = Math.abs(p1[0]) + Math.abs(p2[0]) + Math.abs(p3[0]);
    for (let i = 1; i < p1.length; i++) {
        q = Math.abs(p1[i]) + Math.abs(p2[i]) + Math.abs(p3[i]) + q * x;
    }
    return q;
}
exports.HornerMultiAbsSum = HornerMultiAbsSum;
//# sourceMappingURL=horner-abs-multi-sum.js.map