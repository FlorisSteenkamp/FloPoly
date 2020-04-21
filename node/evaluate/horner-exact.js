"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the exact result of evaluating a univariate polynomial using
 * Horner's method.
 */
// TODO - could possibly made faster using EFTs on the polynomial
function HornerExact(p, x) {
    //console.log('qqq')
    //let q = p[0].slice(); 
    let q = p[0];
    for (let i = 1; i < p.length; i++) {
        q = flo_numerical_1.fastExpansionSum(p[i], flo_numerical_1.scaleExpansion(q, x));
    }
    //return q[q.length-1];
    return flo_numerical_1.estimate(q);
}
exports.HornerExact = HornerExact;
//# sourceMappingURL=horner-exact.js.map