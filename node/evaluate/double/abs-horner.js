"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsHorner = void 0;
const abs = Math.abs;
/**
 * Returns the result of evaluating a univariate polynomial using
 * Horner's method and where the absolute value of each coefficient is taken.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which `p` should be evaluated
 */
function AbsHorner(p, x) {
    let q = 0;
    for (let i = 0; i < p.length; i++) {
        q = q * x + abs(p[i]);
    }
    return q;
}
exports.AbsHorner = AbsHorner;
//# sourceMappingURL=abs-horner.js.map