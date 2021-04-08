"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sturmChain = void 0;
const e_differentiate_1 = require("../../calculus/expansion/e-differentiate");
const e_prem_sequence_subresultant_1 = require("../expansion/e-prem-sequence-subresultant");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDifferentiate = e_differentiate_1.eDifferentiate;
const ePremSequenceSubresultant = e_prem_sequence_subresultant_1.ePremSequenceSubresultant;
/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders
 * with the resulting polynomials given with coefficients as Shewchuk
 * expansions.
 *
 * * intermediate calculations use Shewchuk expansions and the final result is
 * given as an array of polynomials with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * sturmChain([-3,4,2,-2]); //=> [[[-3],[4],[2],[-2]],[[-9],[8],[2]],[[-204],[138]],[[-1692]]]
 * ```
 *
 * @doc
 */
function sturmChain(p) {
    // convert from double precision to Shewchuk expansion
    const p_ = p.map(c => [c]);
    const dp = eDifferentiate(p_);
    return ePremSequenceSubresultant(p_, dp, true);
}
exports.sturmChain = sturmChain;
//# sourceMappingURL=sturm-chain.js.map