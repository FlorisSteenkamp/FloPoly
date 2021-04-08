"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateAt0 = void 0;
/**
 * Returns the constant term of the given polynomial.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * evaluateAt0([3,2,99]); //=> 99
 * ```
 *
 * @doc
 */
function evaluateAt0(p) {
    return p.length === 0 ? 0 : p[p.length - 1];
}
exports.evaluateAt0 = evaluateAt0;
//# sourceMappingURL=evaluate-at-0.js.map