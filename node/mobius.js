"use strict";
// Mobius namespaced functions, i.e. M(x) = (ax + b) / (cx + d) where 
// a,b,c and d are constants. Represented as a 2-diminsional array 
// [[a,b],[c,d]].
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Performs a change of variables x → px + q on the given Mobius
 * function.
 *
 * @ignore
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @param a
 * @param b
 * @returns The modified mobius function
 * M(x) = (a(px + q) + b) / (c(px + q) + d).
 */
function changeVariables(mobius, a, b) {
    /**
     * Performs a change of variables x → ax + b on p(x) where
     * it is a precondition on the polynomial p that deg(p) = 1.
     * @param p - The degree 1 polynomial p(x)
     * @param a
     * @param b
     * @private
     */
    function changeVariables1(p, a, b) {
        return [
            a * p[0],
            p[1] + b * p[0]
        ];
    }
    return [
        changeVariables1(mobius[0], a, b),
        changeVariables1(mobius[1], a, b)
    ];
}
/**
 * Inverts the given mobius, i.e.
 * M(x) = (ax + b) / (cx + d) → (bx + a) / (dx + c)
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function invert(mobius) {
    let [[a, b], [c, d]] = mobius;
    return [[b, a], [d, c]];
}
/**
 * Evaluates the given mobius function at x = 0.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function evaluateAt0(mobius) {
    return mobius[0][1] / mobius[1][1];
}
/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * @private
 * @param mobius - The mobius function
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 */
function evaluateAtInf(mobius) {
    return mobius[0][0] / mobius[1][0];
}
/**
 * Evaluates the given mobius function at a specific x.
 *
 * @ignore
 * @param mobius - The mobius function
 * @param x - The x value at which to evaluate
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns The result of the evaluation.
 */
function evaluate(mobius, x) {
    let [[a, b], [c, d]] = mobius;
    return (a * x + b) / (c * x + d);
}
let Mobius = {
    changeVariables,
    invert,
    evaluateAt0,
    evaluateAtInf,
    evaluate
};
exports.default = Mobius;
//# sourceMappingURL=mobius.js.map