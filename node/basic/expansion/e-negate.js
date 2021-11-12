// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { eNegativeOf as eNegativeOf_ } from "big-float-ts";
const eNegativeOf = eNegativeOf_;
/**
 * Returns the negative of the given polynomial (with coefficients given as
 * Shewchuk floating point expansions), i.e. (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 * ```
 *
 * @doc
 */
function eNegate(p) {
    const result = [];
    for (let i = 0; i < p.length; i++) {
        result.push(eNegativeOf(p[i]));
    }
    return result;
}
export { eNegate };
//# sourceMappingURL=e-negate.js.map