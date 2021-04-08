"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eFromRoots = void 0;
const e_multiply_1 = require("../../../basic/expansion/e-multiply");
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eMultiply = e_multiply_1.eMultiply;
const eNegativeOf = big_float_ts_1.eNegativeOf;
const eToDd = big_float_ts_2.eToDd;
/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors (x - root1)(x - root2) in infinite precision
 * (bar overflow) and rounding back to double-double precision; also returns
 * a coefficient-wise error polynomial and a function that returns the exact
 * polynomial.
 *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots
 *
 * @doc
 */
function eFromRoots(roots) {
    let p = [[1]];
    for (let i = 0; i < roots.length; i++) {
        p = eMultiply(p, [[1], eNegativeOf(roots[i])]);
    }
    const pE = p.map(c => Math.abs(c[c.length - 1] * Number.EPSILON));
    const getPExact = () => p;
    return {
        pDd: p.map(eToDd),
        pE,
        getPExact
    };
}
exports.eFromRoots = eFromRoots;
//# sourceMappingURL=e-from-roots.js.map