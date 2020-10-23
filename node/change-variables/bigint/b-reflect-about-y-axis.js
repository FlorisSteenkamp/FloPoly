"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bReflectAboutYAxis = void 0;
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * bReflectAboutYAxis([5n, 4n, 3n, 2n, 1n]); //=> [5n, -4n, 3n, -2n, 1n]
 */
function bReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}
exports.bReflectAboutYAxis = bReflectAboutYAxis;
//# sourceMappingURL=b-reflect-about-y-axis.js.map