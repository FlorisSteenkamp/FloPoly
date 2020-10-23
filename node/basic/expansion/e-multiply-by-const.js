"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eMultiplyByConst = void 0;
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eSign = big_float_ts_1.eSign;
const expansionProduct = big_float_ts_2.expansionProduct;
/**
 * Returns the exact result (bar underflow / overflow) of multiplying a
 * polynomial (with coefficients given as Shewchuk floating point expansions)
 * by a constant (given as a Shewchuk floating point expansion)
 *
 * @param c a constant (given as a Shewchuk floating point expansion)
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * eMultiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]
 */
function eMultiplyByConst(c, p) {
    if (eSign(c) === 0) {
        return [];
    }
    const d = p.length - 1;
    const result = [];
    for (let i = 0; i < d + 1; i++) {
        result.push(expansionProduct(c, p[i]));
    }
    return result;
}
exports.eMultiplyByConst = eMultiplyByConst;
//# sourceMappingURL=e-multiply-by-const.js.map