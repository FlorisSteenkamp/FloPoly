"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compHornerIsFaithful = void 0;
//import { twoSum } from "big-float-ts";
const eft_horner_1 = require("./eft-horner");
const horner_sum_1 = require("./horner-sum");
const horner_abs_sum_1 = require("./horner-abs-sum");
const gammas_1 = require("./gammas");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { twoSum } = big_float_ts_1.operators;
const HornerSum = horner_sum_1.HornerSum;
const EFTHorner = eft_horner_1.EFTHorner;
const HornerAbsSum = horner_abs_sum_1.HornerAbsSum;
const γs = gammas_1.γs;
const u = Number.EPSILON;
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
    let { r̂, pπ, pσ } = EFTHorner(p, x);
    let ĉ = HornerSum(pπ, pσ, x);
    let [e, r̄] = twoSum(r̂, ĉ);
    let b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
    let α̂ = (γs[2 * n - 1] * b̂) / ((1 - 2 * (n + 1) * u));
    let β̂ = (α̂ + Math.abs(e)) / (1 - 2 * u);
    return {
        isFaithful: α̂ < (u / 2) * Math.abs(r̄),
        errBound: β̂,
        r̄
    };
}
exports.compHornerIsFaithful = compHornerIsFaithful;
//# sourceMappingURL=comp-horner-is-faithful.js.map