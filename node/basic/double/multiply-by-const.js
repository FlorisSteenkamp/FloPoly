"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplyByConst = void 0;
const remove_leading_zeros_1 = require("./remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const removeLeadingZeros = remove_leading_zeros_1.removeLeadingZeros;
/**
 * Returns the result of multiplies a polynomial by a constant in double
 * precision.
 *
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]
 * ```
 *
 * @doc
 */
function multiplyByConst(c, p) {
    if (c === 0) {
        return [];
    }
    const d = p.length;
    const p_ = [];
    for (let i = 0; i < d; i++) {
        p_.push(c * p[i]);
    }
    // We *have* to clip due to possible floating point underflow
    return removeLeadingZeros(p_);
}
exports.multiplyByConst = multiplyByConst;
//# sourceMappingURL=multiply-by-const.js.map