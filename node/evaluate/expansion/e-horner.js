import { fastExpansionSum as fes, scaleExpansion as sce } from "big-float-ts";
/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial using Horner's method - the result is returned as a
 * Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function eHorner(p, x) {
    let q = [0];
    for (let i = 0; i < p.length; i++) {
        // q = p[i] + x*q;
        q = fes(p[i], sce(q, x));
    }
    return q;
}
export { eHorner };
//# sourceMappingURL=e-horner.js.map