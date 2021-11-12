import { eDifferentiate as eDifferentiate_ } from '../../calculus/expansion/e-differentiate.js';
import { ePremSequenceSubresultant as ePremSequenceSubresultant_ } from "./e-prem-sequence-subresultant.js";
import { scaleFloatssToIntss as scaleFloatssToIntss_ } from '../../scale-to-int/scale-floatss-to-intss.js';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eDifferentiate = eDifferentiate_;
const ePremSequenceSubresultant = ePremSequenceSubresultant_;
const scaleFloatssToIntss = scaleFloatssToIntss_;


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
function eSturmChain(p: number[][]): number[][][] {
	p = scaleFloatssToIntss(p);
	
	const dp = eDifferentiate(p);

	return ePremSequenceSubresultant(p, dp, true);
}


export { eSturmChain }
