"use strict";
//import { eDiv, eSign, eCompare, expansionProduct } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConstMultipleOf = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eDiv, eSign, eCompare, expansionProduct } = big_float_ts_1.operators;
/**
 * Returns true if a is an exact constant multiple of b or b of a.
 * @param a a polynomial
 * @param b another polynomial
 */
function isConstMultipleOf(a, b) {
    /** leading coefficient of a */
    let lcA = a[0];
    /** leading coefficient of b */
    let lcB = b[0];
    // If either polynomial is zero
    if (eSign(lcA) === 0 || eSign(lcB) === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    let multiplier;
    let cmpAB = eCompare(lcA, lcB);
    if (cmpAB === 0) {
        multiplier = [1];
    }
    else {
        if (cmpAB < 0) {
            [a, b] = [b, a];
            [lcA, lcB] = [lcB, lcA];
        }
        multiplier = eDiv(lcA, lcB, 0);
    }
    for (let i = 0; i < a.length; i++) {
        let v = expansionProduct(multiplier, b[i]);
        //console.log(v, a[i])
        if (eCompare(v, a[i]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.isConstMultipleOf = isConstMultipleOf;
//# sourceMappingURL=is-const-multiple-of.js.map