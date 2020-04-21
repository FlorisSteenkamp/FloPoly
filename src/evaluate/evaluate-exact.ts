
import { fastExpansionSum, expansionProduct } from "flo-numerical";

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
