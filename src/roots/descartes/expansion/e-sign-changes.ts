import { eSign as eSign_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eSign = eSign_;


/** 
 * Returns the number of sign changes in the polynomial coefficents when 
 * ordered in descending order; zeros are ignored.
 * 
 * * this function is often called `Descartes` in the literature
 * 
 * * returns an upper bound of the number of *positive* real roots of the given 
 * polynomial
 * 
 * * the upper bound returned is always a non-negative multiple of two 
 * (i.e. 0, 2, etc) higher than the actual number of real roots
 * 
 * * the polynomial need not be square free
 *
 * * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable 
 * exponent, then the number of positive roots of the polynomial is 
 * either equal to the number of sign differences between consecutive 
 * nonzero coefficients, or is less than it by an even number. Multiple 
 * roots of the same value are counted separately."
 * 
 * * see [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 * 
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript
 * eSignChanges([[1],[2],[-3],[0],[0],[3],[-1]]); //=> 3
 * ```
 * 
 * @doc
 */
function eSignChanges(p: number[][]): number {
	const d = p.length-1;

	if (d < 1) { return 0; }

	let result = 0;
	let prevSign = Math.sign(eSign(p[0]));
	for (let i=1; i<d+1; i++) {
		const sign_ = Math.sign(eSign(p[i]));
		
		if (sign_ !== prevSign && sign_ !== 0) {
			result++;
			prevSign = sign_;
		}
	}
	
	return result;
}


export { eSignChanges }
