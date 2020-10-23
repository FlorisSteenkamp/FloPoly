"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compHornerIsFaithful = void 0;
const big_float_ts_1 = require("big-float-ts");
const eft_horner_1 = require("./eft-horner");
const horner_sum_1 = require("./horner-sum");
const horner_abs_sum_1 = require("./horner-abs-sum");
const gammas_1 = require("./gammas");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const twoSum = big_float_ts_1.twoSum;
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
 * * once compensated means the error in the evaluation is reduced by roughly
 * `1 / Number.EPSILON` which is again roughly `2^53` - it is the same as using
 * double-double precision in a normal Horner evaluation
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 */
function compHornerIsFaithful(p, x) {
    const n = p.length - 1;
    const { r̂, pπ, pσ } = EFTHorner(p, x);
    const ĉ = HornerSum(pπ, pσ, x);
    const [e, r̄] = twoSum(r̂, ĉ);
    const b̂ = HornerAbsSum(pπ, pσ, Math.abs(x));
    const α̂ = (γs(2 * n - 1) * b̂) / ((1 - 2 * (n + 1) * u));
    const β̂ = (α̂ + Math.abs(e)) / (1 - 2 * u);
    return {
        isFaithful: α̂ < (u / 2) * Math.abs(r̄),
        errBound: β̂,
        r̄
    };
}
exports.compHornerIsFaithful = compHornerIsFaithful;
//# sourceMappingURL=comp-horner-is-faithful.js.map