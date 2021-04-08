"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negativeRootUpperBound_LMQ = exports.negativeRootLowerBound_LMQ = exports.positiveRootLowerBound_LMQ = exports.positiveRootUpperBound_LMQ = void 0;
const negate_1 = require("../../basic/double/negate");
const upper_to_lower_bound_1 = require("./upper-to-lower-bound");
const positive_to_negative_bound_1 = require("./positive-to-negative-bound");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const negate = negate_1.negate;
const upperToLowerBound = upper_to_lower_bound_1.upperToLowerBound;
const positiveToNegativeBound = positive_to_negative_bound_1.positiveToNegativeBound;
/**
 * Returns an upper bound for the positive real roots of the given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 * ```
 *
 * @doc
 */
function positiveRootUpperBound_LMQ(p) {
    const deg = p.length - 1;
    if (deg < 1) {
        return 0;
    }
    if (p[0] < 0) {
        p = negate(p);
    }
    const timesUsed = [];
    for (let i = 0; i < deg; i++) {
        timesUsed.push(1);
    }
    let ub = 0;
    for (let m = 0; m <= deg; m++) {
        if (p[m] >= 0) {
            continue;
        }
        let tempub = Number.POSITIVE_INFINITY;
        let any = false;
        for (let k = 0; k < m; k++) {
            if (p[k] <= 0) {
                continue;
            }
            const temp = (-p[m] / (p[k] / 2 ** timesUsed[k])) ** (1 / (m - k));
            timesUsed[k]++;
            if (tempub > temp) {
                tempub = temp;
            }
            any = true;
        }
        if (any && ub < tempub)
            ub = tempub;
    }
    return ub;
}
exports.positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ;
/**
 * Returns a positive lower bound of the real roots of the given polynomial
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);
exports.positiveRootLowerBound_LMQ = positiveRootLowerBound_LMQ;
/**
 * Returns a negative lower (further from zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const negativeRootLowerBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);
exports.negativeRootLowerBound_LMQ = negativeRootLowerBound_LMQ;
/**
 * Returns a negative upper (closer to zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
const negativeRootUpperBound_LMQ = upperToLowerBound(negativeRootLowerBound_LMQ);
exports.negativeRootUpperBound_LMQ = negativeRootUpperBound_LMQ;
//# sourceMappingURL=root-bounds-lmq.js.map