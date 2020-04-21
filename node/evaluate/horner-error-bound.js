"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const max_abs_coeff_poly_eval_1 = require("./max-abs-coeff-poly-eval");
const gamma_1 = require("../error-analysis/gamma");
/**
 * Classic rule of thumb error bound when using Horner's method to evaluate
 * polynomials.
 * see for instance compensated horner evaluation http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf"
 * @param p The polynomial
 * @param x Value at which polynomial is evaluated.
 */
function hornerErrorBound(p, x) {
    let n = p.length;
    return gamma_1.γ(2 * n) * max_abs_coeff_poly_eval_1.maxAbsCoeffPolyEval(p, x);
}
exports.hornerErrorBound = hornerErrorBound;
//# sourceMappingURL=horner-error-bound.js.map