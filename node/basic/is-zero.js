"use strict";
//import { eSign } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expIsZero = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eSign } = big_float_ts_1.operators;
/**
 * Returns true if the given polynomial is the zero polynomial
 * @param a a polynomial
 */
function expIsZero(a) {
    return a.length === 0 || (a.length === 1 && eSign(a[0]) === 0);
}
exports.expIsZero = expIsZero;
//# sourceMappingURL=is-zero.js.map