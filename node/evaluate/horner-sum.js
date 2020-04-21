"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param p1
 * @param p2
 */
function HornerSum(p1, p2, a) {
    let result = p1[0] + p2[0];
    for (let i = 1; i < p1.length; i++) {
        result = p1[i] + p2[i] + result * a;
    }
    return result;
}
exports.HornerSum = HornerSum;
//# sourceMappingURL=horner-sum.js.map