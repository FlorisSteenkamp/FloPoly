import { eDifferentiate } from '../../calculus/expansion/e-differentiate.js';
import { ePremSequenceSubresultant } from "./e-prem-sequence-subresultant.js";
import { scaleFloatssToIntss } from '../../scale-to-int/scale-floatss-to-intss.js';
import { eRemoveLeadingZeros } from '../../basic/expansion/e-remove-leading-zeros.js';


/**
 * Returns the Sturm chain for the given polynomial using pseudo remainders.
 * 
 * * see [Sturm's Theorem](https://en.wikipedia.org/wiki/Sturm%27s_theorem)
 * * see [Pseudo-remainder sequences](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences)
 * 
 * * leading zero coefficients are removed before the chain is calculated
 *
 * * returns `[]` for the zero polynomial and `[p]` for a non-zero constant
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
function eSturmChain(p: number[][]): number[][][] {
    p = eRemoveLeadingZeros(p);

    if (p.length === 0) { return []; }   // the zero polynomial

    p = scaleFloatssToIntss(p);

    if (p.length === 1) { return [p]; }  // a non-zero constant

    const dp = eDifferentiate(p);

    return ePremSequenceSubresultant(p, dp, true);
}


export { eSturmChain }
