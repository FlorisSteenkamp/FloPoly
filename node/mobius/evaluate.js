"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobEvaluate = void 0;
/**
 * Returns the result of evaluating the given mobius function at a specific x.
 *
 * @param mobius the mobius function
 * @param x the x value at which to evaluate
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function mobEvaluate(mobius, x) {
    let [[a, b], [c, d]] = mobius;
    return (a * x + b) / (c * x + d);
}
exports.mobEvaluate = mobEvaluate;
//# sourceMappingURL=evaluate.js.map