"use strict";
//import { eNegativeOf } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expReflectAboutYAxis = exports.reflectAboutYAxis = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eNegativeOf } = big_float_ts_1.operators;
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 */
function reflectAboutYAxis(p) {
    let d = p.length - 1;
    let result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2) {
            result[i] = -result[i];
        }
    }
    return result;
}
exports.reflectAboutYAxis = reflectAboutYAxis;
/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e.
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * expReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 */
function expReflectAboutYAxis(p) {
    let d = p.length - 1;
    let result = p.slice();
    for (let i = 0; i < d + 1; i++) {
        if (i % 2) {
            result[i] = eNegativeOf(result[i]);
        }
    }
    return result;
}
exports.expReflectAboutYAxis = expReflectAboutYAxis;
//# sourceMappingURL=reflect-about-y-axis.js.map