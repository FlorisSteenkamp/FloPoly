import { ddAddDd } from "double-double";
import { ddRemoveLeadingZeros as ddRemoveLeadingZeros_ } from "./dd-remove-leading-zeros.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ddRemoveLeadingZeros = ddRemoveLeadingZeros_;
/**
 * Returns the result of adding two polynomials in double-double precision.
 *
 * @param p1 a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * @param p2 another polynomial
 *
 * @doc
 */
function ddAdd(p1, p2) {
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
        const c1 = p1[i + Δd1] || [0, 0];
        const c2 = p2[i + Δd2] || [0, 0];
        result.push(ddAddDd(c1, c2));
    }
    // Ensure the result is a valid polynomial representation
    return ddRemoveLeadingZeros(result);
}
export { ddAdd };
// Quokka tests
// ddAdd([[0,1],[0,2],[0,3]],[[0,3],[0,4]]);  /*?*/  //=> [1,5,7]
//# sourceMappingURL=dd-add.js.map