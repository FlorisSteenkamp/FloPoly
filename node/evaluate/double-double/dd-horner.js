import { ddMultDouble2 as qmd, ddAddDd as qaq } from "double-double";
/**
 * Returns the result of evaluating a univariate polynomial using Horner's
 * method with intermediate calculations done in double-double precision and
 * the result returned in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function ddHorner(p, x) {
    let q = [0, 0];
    for (let i = 0; i < p.length; i++) {
        // q = p[i] + x*q;
        q = qaq(p[i], qmd(x, q));
    }
    return q;
}
export { ddHorner };
//# sourceMappingURL=dd-horner.js.map