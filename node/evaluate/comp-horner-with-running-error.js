"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eft_horner_1 = require("./eft-horner");
const horner_sum_1 = require("./horner-sum");
const flo_numerical_1 = require("flo-numerical");
const horner_abs_sum_1 = require("./horner-abs-sum");
const gammas_1 = require("./gammas");
let u = Number.EPSILON / 2;
/**
 * Returns the result of evaluating a univariate polynomial using once compensated
 * Horner's method, including a certified running error bound.
 *
 * * Exactly the same as compHornerIsFaithful, except that it does not include
 * a faithfully rounded check.
 *
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
function compHornerWithRunningError(p, x) {
    let n = p.length - 1;
    let { r̂, pπ, pσ } = eft_horner_1.EFTHorner(p, x);
    // inlined
    //let pπ: number[] = []; let pσ: number[] = []; let σ: number; let r̂ = p[0];	for (let i=1; i<p.length; i++) { let [π,pi] = twoProduct(r̂,x); [σ,r̂] = twoSum(pi, p[i]); pπ.push(π); pσ.push(σ); }
    let ĉ = horner_sum_1.HornerSum(pπ, pσ, x);
    let [e, r̄] = flo_numerical_1.twoSum(r̂, ĉ);
    let b̂ = horner_abs_sum_1.HornerAbsSum(pπ, pσ, Math.abs(x));
    let α̂ = (gammas_1.γs[2 * n - 1] * b̂) / ((1 - 2 * (n + 1) * u));
    let β̂ = (α̂ + Math.abs(e)) / (1 - 2 * u);
    return [r̄, β̂];
}
exports.compHornerWithRunningError = compHornerWithRunningError;
//# sourceMappingURL=comp-horner-with-running-error.js.map