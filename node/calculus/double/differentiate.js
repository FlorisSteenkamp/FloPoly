"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differentiate = void 0;
/**
 * Returns the result of differentiating the given polynomial in double
 * precision.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 * ```
 *
 * @doc
 */
function differentiate(p) {
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push((d - i) * p[i]);
    }
    return result;
}
exports.differentiate = differentiate;
//# sourceMappingURL=differentiate.js.map