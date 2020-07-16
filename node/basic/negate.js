"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expNegate = exports.negate = void 0;
const multiply_by_const_1 = require("./multiply-by-const");
//import { eNegativeOf } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eNegativeOf } = big_float_ts_1.operators;
const multiplyByConst = multiply_by_const_1.multiplyByConst;
/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
function negate(p) {
    return multiplyByConst(-1, p);
}
exports.negate = negate;
/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * expNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 */
function expNegate(p) {
    let result = [];
    for (let i = 0; i < p.length; i++) {
        result.push(eNegativeOf(p[i]));
    }
    return result;
}
exports.expNegate = expNegate;
//# sourceMappingURL=negate.js.map