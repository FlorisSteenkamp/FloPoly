"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bSturmChain = void 0;
const b_differentiate_1 = require("../../calculus/bigint/b-differentiate");
const b_prem_sequence_subresultant_1 = require("./b-prem-sequence-subresultant");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bDifferentiate = b_differentiate_1.bDifferentiate;
const bPremSequenceSubresultant = b_prem_sequence_subresultant_1.bPremSequenceSubresultant;
/**
 * Returns the Sturm Chain for the given polynomial using pseudo remainders.
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * bSturmChain([-3n,4n,2n,-2n]); //=> [[-3n, 4n, 2n, -2n], [-9n, 8n, 2n], [-204n, 138n], [-1692n]]
 */
function bSturmChain(p) {
    const dp = bDifferentiate(p);
    return bPremSequenceSubresultant(p, dp, true);
}
exports.bSturmChain = bSturmChain;
//# sourceMappingURL=b-sturm-chain.js.map