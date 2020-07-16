"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gcdExact = void 0;
const subresultant_pseudo_remainder_sequence_1 = require("../../remainder-sequences/subresultant-pseudo-remainder-sequence");
const is_zero_1 = require("../../basic/is-zero");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const subresultantPseudoRemainderSequence = subresultant_pseudo_remainder_sequence_1.subresultantPseudoRemainderSequence;
const expIsZero = is_zero_1.expIsZero;
/**
 * Returns the gcd of the two given polynomials using Pseudo Remainder
 * Sequences (PRSs).
 * @param a a polynomial
 * @param b another polynomial
 */
function gcdExact(a, b) {
    let isZeroA = expIsZero(a);
    let isZeroB = expIsZero(b);
    if (isZeroA) {
        return b;
    }
    else if (isZeroB) {
        return a;
    }
    let seq = subresultantPseudoRemainderSequence(a, b, false);
    return seq[seq.length - 1];
}
exports.gcdExact = gcdExact;
//# sourceMappingURL=gcd-prs.js.map