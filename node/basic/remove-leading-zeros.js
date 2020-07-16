"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expApproxRemoveLeadingZeros = exports.approxRemoveLeadingZeros = exports.expRemoveLeadingZeros = exports.removeLeadingZeros = void 0;
//import { eSign, eEstimate } from "big-float-ts";
const p_inf_norm_1 = require("../norm/p-inf-norm");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eSign, eEstimate } = big_float_ts_1.operators;
const pInfNorm = p_inf_norm_1.pInfNorm;
/**
 * If the highest power coefficient is 0 then removeLeadingZeros can be called
 * to remove all such highest terms so that the array is a valid presentation of
 * a polynomial.
 * @param p The polynomial to be clipped.
 * @example
 * removeLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * removeLeadingZeros([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function removeLeadingZeros(p) {
    return p[0] !== 0 ? p : removeLeadingZeros(p.slice(1));
}
exports.removeLeadingZeros = removeLeadingZeros;
/**
 * If the highest power coefficient is 0 then clip can be called to remove all
 * such highest terms so that the array is a valid presentation of a polynomial.
 * @param p The polynomial to be clipped.
 * @example
 * expRemoveLeadingZeros([[1e-18], [1e-10], [1e-1]]); //=> [[1e-18], [1e-10], [1e-1]]
 * expRemoveLeadingZeros([[0], [1e-10], [1e-1]]); //=> [[1e-10], [1e-1]]
 */
function expRemoveLeadingZeros(p) {
    return p.length <= 1 || eSign(p[0]) !== 0
        ? p :
        expRemoveLeadingZeros(p.slice(1));
}
exports.expRemoveLeadingZeros = expRemoveLeadingZeros;
/**
 * If the highest power coefficient is small in the sense that the highest power
 * term has a negligible contribution (compared to the other terms) at x = 1
 * then this function can be called to remove all such highest terms. A
 * contribution of less than Number.EPSILON of the highest coefficient will be
 * considered negligible by default.
 * @param p the polynomial to be clipped.
 * @param δ the optional contribution tolerence else Number.EPSILON will be used
 * by default.
 * @example
 * approxRemoveLeadingZeros([1e-18, 1e-10, 1e-5]); //=> [1e-18, 1e-10, 1e-5]
 * approxRemoveLeadingZeros([1e-18, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function approxRemoveLeadingZeros(p, δ = Number.EPSILON) {
    let c = pInfNorm(p);
    if (c === 0) {
        return [0];
    }
    if (Math.abs(p[0]) > δ * c) {
        return p;
    }
    let p_ = p.slice(1);
    while (Math.abs(p_[0]) < δ * c) {
        p_ = p_.slice(1);
    }
    return approxRemoveLeadingZeros(p_, δ);
}
exports.approxRemoveLeadingZeros = approxRemoveLeadingZeros;
/**
 * Like expRemoveLeadingZeros, but useful when underflow might have occured
 * since this function will remove all leading zeros < 2.2250738585072014e−308
 * which is the smallest non-subnormal float.
 * @param p
 * @param δ
 */
function expApproxRemoveLeadingZeros(p) {
    /** the smallest non-subnormal float */
    let DELTA = 2.2250738585072014e-308;
    let lc = Math.abs(eEstimate(p[0])); // estimate of the leading coefficient
    if (p.length === 0 || (p.length === 1 && lc <= DELTA)) {
        return [[0]];
    }
    if (lc > DELTA) {
        return p;
    }
    let p_ = p.slice(1);
    while (p_.length > 0 && Math.abs(eEstimate(p_[0])) < DELTA) {
        p_ = p_.slice(1);
    }
    if (p_.length === 0) {
        return [[0]];
    }
    return expApproxRemoveLeadingZeros(p_);
}
exports.expApproxRemoveLeadingZeros = expApproxRemoveLeadingZeros;
//# sourceMappingURL=remove-leading-zeros.js.map