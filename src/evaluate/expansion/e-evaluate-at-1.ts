
import { fastExpansionSum as fastExpansionSum_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fastExpansionSum = fastExpansionSum_;

/** 
 * Returns the exact result (bar underflow / overflow) of evaluating the given 
 * polynomial at 1.
 * 
 * * faster than at an arbitrary point. 
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 */
function eEvaluateAt1(p: number[][]): number[] {
	let res = [0];
	for (let i=0; i<p.length; i++) {
		res = fastExpansionSum(res, p[i]);
	}

	return res;
}


export { eEvaluateAt1 }
