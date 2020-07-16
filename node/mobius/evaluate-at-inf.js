"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobEvaluateAtInf = void 0;
/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function mobEvaluateAtInf(mobius) {
    return mobius[0][0] / mobius[1][0];
}
exports.mobEvaluateAtInf = mobEvaluateAtInf;
//# sourceMappingURL=evaluate-at-inf.js.map