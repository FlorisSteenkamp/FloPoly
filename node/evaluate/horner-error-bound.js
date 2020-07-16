"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hornerErrorBound = void 0;
const max_abs_coeff_poly_eval_1 = require("./max-abs-coeff-poly-eval");
const gamma_1 = require("../error-analysis/gamma");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const γ = gamma_1.γ;
const maxAbsCoeffPolyEval = max_abs_coeff_poly_eval_1.maxAbsCoeffPolyEval;
/**
 * Classic rule of thumb error bound when using Horner's method to evaluate
 * polynomials.
 * see for instance compensated horner evaluation http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf"
 * @param p The polynomial
 * @param x Value at which polynomial is evaluated.
 */
function hornerErrorBound(p, x) {
    let n = p.length;
    return γ(2 * n) * maxAbsCoeffPolyEval(p, x);
}
exports.hornerErrorBound = hornerErrorBound;
//# sourceMappingURL=horner-error-bound.js.map