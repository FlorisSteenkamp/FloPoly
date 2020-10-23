"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerAbsSum = void 0;
/**
 * @internal
 *
 * @param p1
 * @param p2
 */
function HornerAbsSum(p1, p2, x) {
    let q = 0;
    for (let i = 0; i < p1.length; i++) {
        // TODO - Math.abs(p1[i] + p2[i]) <-- should this be Math.abs(p1[i]) + Math.abs(p2[i]) ??
        q = Math.abs(p1[i] + p2[i]) + q * x;
    }
    return q;
}
exports.HornerAbsSum = HornerAbsSum;
//# sourceMappingURL=horner-abs-sum.js.map