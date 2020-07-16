"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p2Norm = void 0;
/**
 * Returns the approximate p-2 norm, i.e. the Euclidean norm of the given array
 * of numbers.
 */
function p2Norm(p) {
    let sum = 0;
    for (let i = 0; i < p.length; i++) {
        sum += Math.pow(Math.abs(p[i]), 2);
    }
    return Math.sqrt(sum);
}
exports.p2Norm = p2Norm;
//# sourceMappingURL=p-2-norm.js.map