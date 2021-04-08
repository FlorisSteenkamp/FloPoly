"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerSum = void 0;
/**
 * * helper function
 *
 * @param p1
 * @param p2
 *
 * @internal
 */
function HornerSum(p1, p2, a) {
    let result = 0;
    for (let i = 0; i < p1.length; i++) {
        result = p1[i] + p2[i] + result * a;
    }
    return result;
}
exports.HornerSum = HornerSum;
//# sourceMappingURL=horner-sum.js.map