import { eCompare as eCompare_ } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eCompare = eCompare_;
/**
 * Returns true if two polynomials (with coefficients given as Shewchuk floating
 * point expansions) are exactly equal by comparing coefficients, false otherwise.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eEqual([[1],[2],[3],[0,4]], [[1],[2],[3],[4]]);   //=> true
 * eEqual([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 * ```
 *
 * @doc
 */
function eEqual(p1, p2) {
    if (p1.length !== p2.length) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (eCompare(p1[i], p2[i]) !== 0) {
            return false;
        }
    }
    return true;
}
export { eEqual };
//# sourceMappingURL=e-equal.js.map