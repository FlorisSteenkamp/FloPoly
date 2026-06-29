import { scaleExpansion } from "big-float-ts";
/**
 * Returns the exact result (bar underflow / overflow) of differentiating the
 * given polynomial (with Shewchuk expansion coefficients).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eDifferentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 * ```
 *
 * @doc
 */
function eDifferentiate(p) {
    const d = p.length - 1;
    if (d <= 0) {
        return [];
    }
    const result = new Array(d);
    for (let i = 0; i < d; i++) {
        result[i] = scaleExpansion(p[i], d - i);
    }
    return result;
}
export { eDifferentiate };
//# sourceMappingURL=e-differentiate.js.map