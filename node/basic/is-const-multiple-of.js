"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
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
    if (flo_numerical_1.sign(lcA) === 0 || flo_numerical_1.sign(lcB) === 0) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    let multiplier;
    let cmpAB = flo_numerical_1.compare(lcA, lcB);
    if (cmpAB === 0) {
        multiplier = [1];
    }
    else {
        if (cmpAB < 0) {
            [a, b] = [b, a];
            [lcA, lcB] = [lcB, lcA];
        }
        multiplier = flo_numerical_1.expansionDiv(lcA, lcB, 0);
    }
    for (let i = 0; i < a.length; i++) {
        let v = flo_numerical_1.expansionProduct(multiplier, b[i]);
        //console.log(v, a[i])
        if (flo_numerical_1.compare(v, a[i]) !== 0) {
            return false;
        }
    }
    return true;
}
exports.isConstMultipleOf = isConstMultipleOf;
//# sourceMappingURL=is-const-multiple-of.js.map