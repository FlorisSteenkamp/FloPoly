"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horner = void 0;
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method in double precision floating point arithmetic.
 *
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 */
function Horner(p, x) {
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * x + p[i];
    }
    return q;
}
exports.Horner = Horner;
//# sourceMappingURL=horner.js.map