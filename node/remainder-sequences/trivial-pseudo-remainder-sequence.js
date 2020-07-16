"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trivialPseudoRemainderSequence = void 0;
const pseudo_remainder_1 = require("./pseudo-remainder");
const is_zero_1 = require("../basic/is-zero");
const is_const_1 = require("../basic/is-const");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const prem = pseudo_remainder_1.prem;
const expIsZero = is_zero_1.expIsZero;
const expIsConst = is_const_1.expIsConst;
/**
 * Returns the trivial pseudo remainder sequence of a/b.
 * * A disadvantage of using the trivial form is that intermediate coefficients
 * tend to become too high.
 * @param f a polynomial
 * @param g another polynomial
 */
function trivialPseudoRemainderSequence(f, g) {
    let r = [f, g];
    for (let i = 1;; i++) {
        // change to pseudo-remainder, i.e. not simply r = a; this allows the 
        // remainders to stay in 'Z'
        let r_ = prem(r[i - 1], r[i], false).r;
        if (expIsZero(r_)) {
            return r;
        }
        r.push(r_);
        if (expIsConst(r_)) {
            // the remainder is a constant so the next remainder will be 0 
            // anyway.
            return r;
        }
    }
}
exports.trivialPseudoRemainderSequence = trivialPseudoRemainderSequence;
//# sourceMappingURL=trivial-pseudo-remainder-sequence.js.map