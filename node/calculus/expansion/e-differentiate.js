"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eDifferentiate = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scaleExpansion = big_float_ts_1.scaleExpansion;
/**
 * Returns the exact result (bar underflow / overflow) of differentiating the
 * given polynomial (with Shewchuk expansion coefficients).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eDifferentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 * ```
 *
 * @doc
 */
function eDifferentiate(p) {
    const result = [];
    const d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(scaleExpansion(p[i], d - i));
    }
    return result;
}
exports.eDifferentiate = eDifferentiate;
//# sourceMappingURL=e-differentiate.js.map