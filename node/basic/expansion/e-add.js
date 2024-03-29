import { eRemoveLeadingZeros as eRemoveLeadingZeros_ } from "./e-remove-leading-zeros.js";
import { fastExpansionSum as fastExpansionSum_ } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fastExpansionSum = fastExpansionSum_;
const eRemoveLeadingZeros = eRemoveLeadingZeros_;
/**
 * Returns the exact result (bar underflow / overflow) of adding two
 * polynomials with coefficients given as Shewchuk floating point expansions.
 *
 * @param p1 a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 *
 * @example
 * ```typescript
 * eAdd([[1],[2],[3]],[[3],[4]]); //=> [[1],[5],[7]]
 * ```
 *
 * @doc
 */
function eAdd(p1, p2) {
    // Initialize result array  
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    const Δd = d1 - d2;
    const Δd1 = Δd < 0 ? +Δd : 0;
    const Δd2 = Δd > 0 ? -Δd : 0;
    const d = Math.max(d1, d2);
    // Add coefficients
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        const c1 = p1[i + Δd1] || [0];
        const c2 = p2[i + Δd2] || [0];
        result.push(fastExpansionSum(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return eRemoveLeadingZeros(result);
}
export { eAdd };
//# sourceMappingURL=e-add.js.map