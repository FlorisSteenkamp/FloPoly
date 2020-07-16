"use strict";
//import { fastExpansionSum, scaleExpansion, eEstimate } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HornerExact = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { fastExpansionSum, scaleExpansion, eEstimate } = big_float_ts_1.operators;
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
        q = fastExpansionSum(p[i], scaleExpansion(q, x));
    }
    //return q[q.length-1];
    return eEstimate(q);
}
exports.HornerExact = HornerExact;
//# sourceMappingURL=horner-exact.js.map