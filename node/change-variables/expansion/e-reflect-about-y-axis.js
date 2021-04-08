"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eReflectAboutYAxis = void 0;
const big_float_ts_1 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eNegativeOf = big_float_ts_1.eNegativeOf;
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 * ```
 *
 * @doc
 */
function eReflectAboutYAxis(p) {
    const d = p.length - 1;
    if (d < 0) {
        return [];
    }
    const result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2) {
            result[i] = eNegativeOf(result[i]);
        }
    }
    return result;
}
exports.eReflectAboutYAxis = eReflectAboutYAxis;
//# sourceMappingURL=e-reflect-about-y-axis.js.map