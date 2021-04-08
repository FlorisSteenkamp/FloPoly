"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddDifferentiate = void 0;
const double_double_1 = require("double-double");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ddMultDouble2 = double_double_1.ddMultDouble2;
/**
 * Returns the result of differentiating the given polynomial (with coefficients
 * given in double-double precision) in double-double precision.
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * ddDifferentiate([[0,5], [0,4], [0,3], [0,2], [0,1]]); //=> [[0,20], [0,12], [0,6], [0,2]]
 * ```
 *
 * @doc
 */
function ddDifferentiate(p) {
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(ddMultDouble2((d - i), p[i]));
    }
    return result;
}
exports.ddDifferentiate = ddDifferentiate;
//# sourceMappingURL=dd-differentiate.js.map