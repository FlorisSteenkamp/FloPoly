"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bPremSequenceTrivial = void 0;
const b_pdiv_trivial_1 = require("./b-pdiv-trivial");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bPdivTrivial = b_pdiv_trivial_1.bPdivTrivial;
/**
 * ❗ DON'T USE - coefficients grow way too big, making it slow - use
 * [[bPremSequenceSubresultant]] instead. ❗
 *
 * Returns the trivial pseudo remainder sequence of a/b.
 *
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 *
* * see [Trivial Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Trivial_pseudo-remainder_sequence)
 *
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r;
 *
 * @doc
 */
function bPremSequenceTrivial(f, g) {
    const r = [f, g]; // Initialize the PRS
    let i = 1;
    while (true) {
        const r_ = bPdivTrivial(r[i - 1], r[i]).r;
        if (r_.length === 0) {
            return r;
        }
        r.push(r_);
        if (r_.length === 1) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        i++;
    }
}
exports.bPremSequenceTrivial = bPremSequenceTrivial;
//# sourceMappingURL=b-prem-sequence-trivial.js.map