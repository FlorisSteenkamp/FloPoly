"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
const gamma_1 = require("../error-analysis/gamma");
const abs = Math.abs;
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
        result.push(flo_numerical_1.qMultDouble2((d - i), p[i]));
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
        let c = flo_numerical_1.qMultDouble2(deg, p[i]);
        dp.push(c);
        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
        // if 3,5,7 or 9, etc. then additional error occurs
        // deg is a power of 2 <=> (deg & deg-1) === 0
        let extraErr = (deg & deg - 1) === 0 ? 0 : gamma_1.γγ3;
        let $c = flo_numerical_1.estimate(c);
        dpE.push(
        //deg * (pE[i] + Math.abs($c)*extraErr)
        deg * pE[i] + abs($c) * extraErr);
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
        result.push(flo_numerical_1.scaleExpansion(p[i], d - i));
    }
    return result;
}
exports.differentiateExact = differentiateExact;
//# sourceMappingURL=differentiate.js.map