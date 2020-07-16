"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideByConst = void 0;
const remove_leading_zeros_1 = require("./remove-leading-zeros");
//import { eSign, expansionProduct } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const removeLeadingZeros = remove_leading_zeros_1.removeLeadingZeros;
const { eSign, expansionProduct } = big_float_ts_1.operators;
/**
 * Divides a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 */
function divideByConst(p, c) {
    if (c === 0) {
        return undefined;
    }
    let d = p.length;
    let r = [];
    for (let i = 0; i < d; i++) {
        r.push(p[i] / c);
    }
    return r;
}
exports.divideByConst = divideByConst;
//# sourceMappingURL=divide-by-const.js.map