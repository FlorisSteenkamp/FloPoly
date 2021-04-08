"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negate = void 0;
/**
 * Returns the negative of the given polynomial (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @example
 * ```typescript
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 * ```
 *
 * @doc
 */
function negate(p) {
    const p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(-p[i]);
    }
    return p_;
}
exports.negate = negate;
//# sourceMappingURL=negate.js.map