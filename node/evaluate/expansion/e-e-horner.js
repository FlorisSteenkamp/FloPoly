import { fastExpansionSum as fastExpansionSum_ } from "big-float-ts";
import { expansionProduct as expansionProduct_ } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fastExpansionSum = fastExpansionSum_;
const expansionProduct = expansionProduct_;
/**
 * Returns the exact result (bar underflow / overflow) of evaluating a
 * univariate polynomial at a point given as a Shewchuk expansion using
 * Horner's method - the result is returned as a Shewchuk expansion.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
function eeHorner(p, x) {
    let result = [0];
    for (let i = 0; i < p.length; i++) {
        result = fastExpansionSum(p[i], expansionProduct(result, x));
    }
    return result;
}
export { eeHorner };
//# sourceMappingURL=e-e-horner.js.map