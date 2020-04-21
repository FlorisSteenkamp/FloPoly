"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Evaluates the given mobius function at x = 0.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function mobEvaluateAt0(mobius) {
    return mobius[0][1] / mobius[1][1];
}
exports.mobEvaluateAt0 = mobEvaluateAt0;
//# sourceMappingURL=evaluate-at-0.js.map