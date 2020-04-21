"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abs_coeff_1 = require("../basic/abs-coeff");
const evaluate_exact_1 = require("../evaluate/evaluate-exact");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns an accurate estimate of the condition number of the given polynomial.
 * * for testing purposes
 * @param p a polynomial
 */
function conditionNumber(p, x) {
    let pN = abs_coeff_1.absCoeff(p).map(x => [x]);
    let pD = p.map(x => [x]);
    let N = evaluate_exact_1.evaluateExact(pN, [x]);
    let D = evaluate_exact_1.evaluateExact(pD, [x]);
    return Math.abs(flo_numerical_1.estimate(N) / flo_numerical_1.estimate(D));
}
exports.conditionNumber = conditionNumber;
//# sourceMappingURL=condition-number.js.map