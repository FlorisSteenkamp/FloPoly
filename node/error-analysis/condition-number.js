"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionNumber = void 0;
const abs_coeff_1 = require("../basic/abs-coeff");
const evaluate_exact_1 = require("../evaluate/evaluate-exact");
const big_float_ts_1 = require("big-float-ts");
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
    return Math.abs(big_float_ts_1.eEstimate(N) / big_float_ts_1.eEstimate(D));
}
exports.conditionNumber = conditionNumber;
//# sourceMappingURL=condition-number.js.map