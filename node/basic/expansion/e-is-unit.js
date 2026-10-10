import { eCompare } from "big-float-ts";
/**
 * Returns true if the given polynomial (with coefficients given as Shewchuk
 * floating point expansions) is the unit polynomial, i.e. === 1.
 *
 * * the coefficient is compared by value, i.e. the expansion need not be
 *   compressed
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function eIsUnit(p) {
    return p.length === 1 && eCompare(p[0], [1]) === 0;
}
export { eIsUnit };
//# sourceMappingURL=e-is-unit.js.map