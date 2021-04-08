"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionNumber = void 0;
const abs_coeff_1 = require("../basic/double/abs-coeff");
const comp_horner_k_1 = require("../evaluate/double/comp-horner-k");
/**
 * Returns an accurate estimate (K === 4 => double-double-double-double
 * precision) of the condition number of the given polynomial when evaluated at
 * a given point.
 *
 * * **for testing purposes**
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
function conditionNumber(p, x) {
    const pN = abs_coeff_1.absCoeff(p);
    const pD = p;
    const N = comp_horner_k_1.CompHornerK(pN, x, 4);
    const D = Math.abs(comp_horner_k_1.CompHornerK(pD, x, 4));
    return Math.abs(N / D);
}
exports.conditionNumber = conditionNumber;
//# sourceMappingURL=condition-number.js.map