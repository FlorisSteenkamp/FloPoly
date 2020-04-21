"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eft_horner_1 = require("./eft-horner");
const horner_with_running_error_1 = require("./horner-with-running-error");
const horner_1 = require("./horner");
const abs_horner_1 = require("./abs-horner");
const gamma_1 = require("../error-analysis/gamma");
const abs = Math.abs;
/**
 * Returns the result of evaluating the given polynomial at x such that the sign
 * is correct when positive or negative and not decidable when the sign is 0.
 * * if zero is returned then the result was too close to 0 to evaluate accurately.
 * @param p a multi-polynomial, ordered by most significant 'coefficients' first
 * @param pE an error polynomial - all coefficients must be positive
 * @param x an evaluation point
 * @param multiplier the error needs to be a multiple of this number smaller
 * than the evaluated value, otherwise zero is returned
 */
function evalK1MultiWithErrBounds(p, pE, x, multiplier = 1) {
    // first do a fast evaluation
    let [r, e1] = horner_with_running_error_1.hornerWithRunningError(p[0], x);
    let e2 = gamma_1.γ2 * abs_horner_1.AbsHorner(p[0], x); // the error due to not considering p[1]
    let E = horner_1.Horner(pE, x); // error due to imprecision in coefficients
    //let ee = e1+e2+maxE; // in difficult cases maxE can be larger than e1+e2
    let ee = e1 + e2 + E; // in difficult cases maxE can be larger than e1+e2
    if (ee * multiplier < abs(r)) {
        // we are within bounds
        return { r̂: r, e: ee };
    }
    // error is too large - do a more precise evaluation
    let { r̂, pπ, pσ } = eft_horner_1.EFTHorner(p[0], x);
    let [C1, c1] = horner_with_running_error_1.hornerWithRunningError(pπ, x);
    let [C2, c2] = horner_with_running_error_1.hornerWithRunningError(pσ, x);
    let [C3, c3] = horner_with_running_error_1.hornerWithRunningError(p[1], x);
    let e = (c1 + c2 + c3) + E; // typically: c1,c2 < c3 < E
    r̂ = (C1 + C2 + C3) + r̂; // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    e += gamma_1.γ1 * r̂;
    if (e * multiplier < abs(r̂)) {
        return { r̂, e };
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return { r̂: 0, e };
}
exports.evalK1MultiWithErrBounds = evalK1MultiWithErrBounds;
//# sourceMappingURL=eval-k-multi-with-err-bounds.js.map