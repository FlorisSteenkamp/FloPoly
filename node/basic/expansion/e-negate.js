"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eNegate = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const eNegativeOf = big_float_ts_1.eNegativeOf;
/**
 * Returns the negative of the given polynomial (with coefficients given as
 * Shewchuk floating point expansions), i.e. (p -> -p).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * eNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 */
function eNegate(p) {
    const result = [];
    for (let i = 0; i < p.length; i++) {
        result.push(eNegativeOf(p[i]));
    }
    return result;
}
exports.eNegate = eNegate;
//# sourceMappingURL=e-negate.js.map