"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bInvert = void 0;
/**
 * Inverts the given polynomial by reversing the order of the coefficients,
 * i.e. p(x) -> x^deg(p) * p(1/x)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bInvert([3n,2n,-5n]);  // => [-5n,2n,3n]
 * ```
 *
 * @doc
 */
function bInvert(p) {
    return p.slice().reverse();
}
exports.bInvert = bInvert;
//# sourceMappingURL=b-invert.js.map