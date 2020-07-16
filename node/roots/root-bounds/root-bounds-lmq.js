"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negativeRootLowerBound_LMQ = exports.negativeRootUpperBound_LMQ = exports.positiveRootLowerBound_LMQ = exports.positiveRootUpperBound_LMQ = void 0;
const negate_1 = require("../../basic/negate");
const upper_to_lower_bound_1 = require("./upper-to-lower-bound");
const positive_to_negative_bound_1 = require("./positive-to-negative-bound");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const negate = negate_1.negate;
const upperToLowerBound = upper_to_lower_bound_1.upperToLowerBound;
const positiveToNegativeBound = positive_to_negative_bound_1.positiveToNegativeBound;
const POWERS = [
    1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
    65536, 131072, 262144, 524288, 1048576, 2097152
];
/**
 * Returns an upper bound for the positive real roots of the given
 * polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * @param p a polynomial
 * @example
 * positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436
 * positiveRootUpperBound_LMQ([2,3]);           //=> 0
 * positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p) {
    let deg = p.length - 1;
    if (deg < 1) {
        return 0;
    }
    if (p[0] < 0) {
        p = negate(p);
    }
    let timesUsed = [];
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
            // Table lookup is about 70% faster but both are
            // extemely fast anyway. 
            // Result is at https://www.measurethat.net/Benchmarks/ShowResult/6610
            let pow = timesUsed[k];
            let powres;
            if (pow > 20) {
                powres = Math.pow(2, pow);
            }
            else {
                powres = POWERS[pow];
            }
            let temp = Math.pow(-p[m] / (p[k] / powres), 1 / (m - k));
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
/** Returns a positive lower bound of the roots of the given polynomial */
let positiveRootLowerBound_LMQ = upperToLowerBound(positiveRootUpperBound_LMQ);
exports.positiveRootLowerBound_LMQ = positiveRootLowerBound_LMQ;
/**
 * Returns a negative upper (upper here means further from zero) bound of the
 * roots of the given polynomial .
 */
let negativeRootUpperBound_LMQ = positiveToNegativeBound(positiveRootUpperBound_LMQ);
exports.negativeRootUpperBound_LMQ = negativeRootUpperBound_LMQ;
/**
 * Returns a negative lower (lower here means closer to zero) bound of the roots
 * of the given polynomial.
 */
let negativeRootLowerBound_LMQ = upperToLowerBound(negativeRootUpperBound_LMQ);
exports.negativeRootLowerBound_LMQ = negativeRootLowerBound_LMQ;
//# sourceMappingURL=root-bounds-lmq.js.map