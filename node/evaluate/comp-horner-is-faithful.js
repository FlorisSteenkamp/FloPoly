"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eft_horner_1 = require("./eft-horner");
const horner_sum_1 = require("./horner-sum");
const horner_abs_sum_1 = require("./horner-abs-sum");
const flo_numerical_1 = require("flo-numerical");
const gammas_1 = require("./gammas");
let u = Number.EPSILON;
/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a dynamic check for faithfull rounding and a
 * certified running error bound.
 *
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
function compHornerIsFaithful(p, x) {
    let n = p.length - 1;
    let { r̂, pπ, pσ } = eft_horner_1.EFTHorner(p, x);
    let ĉ = horner_sum_1.HornerSum(pπ, pσ, x);
    let [e, r̄] = flo_numerical_1.twoSum(r̂, ĉ);
    let b̂ = horner_abs_sum_1.HornerAbsSum(pπ, pσ, Math.abs(x));
    let α̂ = (gammas_1.γs[2 * n - 1] * b̂) / ((1 - 2 * (n + 1) * u));
    let β̂ = (α̂ + Math.abs(e)) / (1 - 2 * u);
    return {
        isFaithful: α̂ < (u / 2) * Math.abs(r̄),
        errBound: β̂,
        r̄
    };
}
exports.compHornerIsFaithful = compHornerIsFaithful;
//# sourceMappingURL=comp-horner-is-faithful.js.map