
//import { fastExpansionSum, expansionProduct } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { fastExpansionSum, expansionProduct } = bigFloatOperators;


/**
 * Returns the exact (bar underflow/overflow) result of evaluating a univariate 
 * polynomial using Horner's method.
 * @param p 
 * @param a 
 */
function evaluateExact(p: number[][], a: number[]): number[] {
	if (p.length === 0) { return [0]; }

	let result = p[0]; 
	for (let i=1; i<p.length; i++) {
		result = fastExpansionSum(p[i], expansionProduct(result, a));
	}
	
	return result;
}


export { evaluateExact }
