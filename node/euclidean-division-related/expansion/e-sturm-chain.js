"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSturmChain = void 0;
const e_differentiate_1 = require("../../calculus/expansion/e-differentiate");
const e_prem_sequence_subresultant_1 = require("./e-prem-sequence-subresultant");
const scale_floatss_to_intss_1 = require("../../scale-to-int/scale-floatss-to-intss");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDifferentiate = e_differentiate_1.eDifferentiate;
const ePremSequenceSubresultant = e_prem_sequence_subresultant_1.ePremSequenceSubresultant;
const scaleFloatssToIntss = scale_floatss_to_intss_1.scaleFloatssToIntss;
/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders.
 *
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eSturmChain([[-3],[4],[2],[-2]]); //=> [[[-3],[4],[2],[-2]],[[-9],[8],[2]],[[-204],[138]],[[-1692]]]
 * ```
 *
 * @doc
 */
function eSturmChain(p) {
    p = scaleFloatssToIntss(p);
    const dp = eDifferentiate(p);
    return ePremSequenceSubresultant(p, dp, true);
}
exports.eSturmChain = eSturmChain;
//# sourceMappingURL=e-sturm-chain.js.map