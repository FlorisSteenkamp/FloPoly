"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differentiateQuadWithError = exports.differentiateExact = exports.differentiateQuad = exports.differentiate = void 0;
//import { scaleExpansion, eEstimate } from "big-float-ts";
//import { ddMultDouble2 } from 'double-double';
const gamma_1 = require("../error-analysis/gamma");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const double_double_1 = require("double-double");
const big_float_ts_1 = require("big-float-ts");
const { ddMultDouble2 } = double_double_1.operators;
const { scaleExpansion, eEstimate } = big_float_ts_1.operators;
const γγ = gamma_1.γγ;
const γγ3 = γγ(3);
/**
 * Returns the approximate result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiate(p) {
    let result = [];
    let d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push((d - i) * p[i]);
    }
    return result;
}
exports.differentiate = differentiate;
/**
 * Returns the result of differentiating the given polynomial in quad precision.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiateQuad(p) {
    let result = [];
    let d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(ddMultDouble2((d - i), p[i]));
    }
    return result;
}
exports.differentiateQuad = differentiateQuad;
/**
 * * precondition: max degree of p === 9
 * @param p a quad precision polynomial
 * @param pE
 */
function differentiateQuadWithError({ p, pE }) {
    let dp = [];
    let dpE = [];
    let d = p.length - 1;
    for (let i = 0; i < d; i++) {
        let deg = d - i;
        let c = ddMultDouble2(deg, p[i]);
        dp.push(c);
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        let extraErr = (deg & deg - 1) === 0 ? 0 : γγ3;
        let $c = eEstimate(c);
        dpE.push(
        //deg * (pE[i] + Math.abs($c)*extraErr)
        deg * pE[i] + Math.abs($c) * extraErr);
    }
    return { p: dp, pE: dpE };
}
exports.differentiateQuadWithError = differentiateQuadWithError;
/**
 * Returns the exact result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 */
function differentiateExact(p) {
    let result = [];
    let d = p.length - 1;
    for (let i = 0; i < d; i++) {
        result.push(scaleExpansion(p[i], d - i));
    }
    return result;
}
exports.differentiateExact = differentiateExact;
//# sourceMappingURL=differentiate.js.map