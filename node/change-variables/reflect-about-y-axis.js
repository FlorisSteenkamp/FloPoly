"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
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
            result[i] = flo_numerical_1.negativeOf(result[i]);
        }
    }
    return result;
}
exports.expReflectAboutYAxis = expReflectAboutYAxis;
//# sourceMappingURL=reflect-about-y-axis.js.map