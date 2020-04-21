"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const horner_with_running_error_1 = require("./horner-with-running-error");
const comp_horner_k_1 = require("./comp-horner-k");
const comp_horner_with_running_error_1 = require("./comp-horner-with-running-error");
const quad_split_1 = require("./quad-split");
const gammas_1 = require("./gammas");
let u = Number.EPSILON;
/**
 * Returns the result of evaluating the given polynomial at x and a level that
 * indicates the difficulty of attaining the correct sign.
 * * polynomial coefficients must be given in quad precision
 * @param p a polynomial
 * @param x an evaluation point
 */
function quadEvalK1(p, x) {
    let [p1, p2] = quad_split_1.quadSplit(p);
    let [r̂1, e1] = horner_with_running_error_1.hornerWithRunningError(p1, x);
    let [r̂2, e2] = horner_with_running_error_1.hornerWithRunningError(p2, x);
    let r̂ = r̂1 + r̂2;
    if (Math.abs(r̂ * (1 - gammas_1.γs[1])) - (e1 + e2) * (1 + gammas_1.γs[1]) < 0) {
        return quadEvalK2(p, x);
    }
    return {
        r̂,
        level: 1
    };
}
exports.quadEvalK1 = quadEvalK1;
function quadEvalK2(p, x) {
    let [p1, p2] = quad_split_1.quadSplit(p);
    let [r̂1, e1] = comp_horner_with_running_error_1.compHornerWithRunningError(p1, x);
    let [r̂2, e2] = comp_horner_with_running_error_1.compHornerWithRunningError(p2, x);
    let r̂ = r̂1 + r̂2;
    if (Math.abs(r̂ * (1 - gammas_1.γs[1])) - (e1 + e2) * (1 + gammas_1.γs[1]) < 0) {
        return quadEvalK4(p, x);
    }
    return {
        r̂,
        level: 2
    };
}
exports.quadEvalK2 = quadEvalK2;
function quadEvalK4(p, x) {
    let [p1, p2] = quad_split_1.quadSplit(p);
    let r̂1 = comp_horner_k_1.CompHornerK(p1, x, 4);
    let r̂2 = comp_horner_k_1.CompHornerK(p2, x, 3);
    let r̂ = r̂1 + r̂2;
    return {
        r̂,
        level: 4
    };
}
exports.quadEvalK4 = quadEvalK4;
//# sourceMappingURL=quad-eval-k.js.map