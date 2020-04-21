"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abs_coeff_1 = require("../basic/abs-coeff");
const horner_1 = require("./horner");
const gamma_1 = require("../error-analysis/gamma");
/**
 * Returns an upper bound of evaluating the given polynomial (using Horner's
 * Algorithm) where all coefficients are made positive.
 * @param p a polynomial
 * @param x an evaluation point
 */
function maxAbsCoeffPolyEval(p, x) {
    p = abs_coeff_1.absCoeff(p);
    return horner_1.Horner(p, Math.abs(x)) * (1 + gamma_1.γ1);
}
exports.maxAbsCoeffPolyEval = maxAbsCoeffPolyEval;
//# sourceMappingURL=max-abs-coeff-poly-eval.js.map