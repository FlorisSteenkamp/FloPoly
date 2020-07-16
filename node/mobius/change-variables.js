"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobChangeVariables = void 0;
/**
 * Performs a change of variables x → px + q on the given Mobius
 * function.
 *
 * @param mobius the mobius function M(x) = (ax + b) / (cx + d) represented
 * as [[a,b],[c,d]]
 * @param a
 * @param b
 * @returns The modified mobius function
 * M(x) = (a(px + q) + b) / (c(px + q) + d).
 */
function mobChangeVariables(mobius, a, b) {
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
exports.mobChangeVariables = mobChangeVariables;
//# sourceMappingURL=change-variables.js.map