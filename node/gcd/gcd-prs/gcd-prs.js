"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subresultant_pseudo_remainder_sequence_1 = require("../../remainder-sequences/subresultant-pseudo-remainder-sequence");
const is_zero_1 = require("../../basic/is-zero");
/**
 * Returns the gcd of the two given polynomials using Pseudo Remainder
 * Sequences (PRSs).
 * @param a a polynomial
 * @param b another polynomial
 */
function gcdExact(a, b) {
    let isZeroA = is_zero_1.expIsZero(a);
    let isZeroB = is_zero_1.expIsZero(b);
    if (isZeroA) {
        return b;
    }
    else if (isZeroB) {
        return a;
    }
    let seq = subresultant_pseudo_remainder_sequence_1.subresultantPseudoRemainderSequence(a, b, false);
    return seq[seq.length - 1];
}
exports.gcdExact = gcdExact;
//# sourceMappingURL=gcd-prs.js.map