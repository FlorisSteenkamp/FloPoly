"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxAbsCoeffPolyEval = void 0;
const abs_coeff_1 = require("../basic/abs-coeff");
const horner_1 = require("./horner");
const gamma_1 = require("../error-analysis/gamma");
const γ = gamma_1.γ;
const Horner = horner_1.Horner;
const absCoeff = abs_coeff_1.absCoeff;
const γ1 = γ(1);
/**
 * Returns an upper bound of evaluating the given polynomial (using Horner's
 * Algorithm) where all coefficients are made positive.
 * @param p a polynomial
 * @param x an evaluation point
 */
function maxAbsCoeffPolyEval(p, x) {
    p = absCoeff(p);
    return Horner(p, Math.abs(x)) * (1 + γ1);
}
exports.maxAbsCoeffPolyEval = maxAbsCoeffPolyEval;
//# sourceMappingURL=max-abs-coeff-poly-eval.js.map