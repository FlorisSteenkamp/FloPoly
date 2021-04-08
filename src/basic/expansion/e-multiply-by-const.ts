import { eSign as eSign_ } from "big-float-ts";
import { expansionProduct as expansionProduct_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eSign = eSign_;
const expansionProduct = expansionProduct_;


/** 
 * Returns the exact result (bar underflow / overflow) of multiplying a 
 * polynomial (with coefficients given as Shewchuk floating point expansions) 
 * by a constant (given as a Shewchuk floating point expansion)
 * 
 * @param c a constant (given as a Shewchuk floating point expansion)
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript 
 * eMultiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]  
 * ```
 * 
 * @doc
 */
function eMultiplyByConst(c: number[], p: number[][]): number[][] {
	if (eSign(c) === 0) { return []; }
	
	const d = p.length-1;
	const result = [];
	for (let i=0; i<d+1; i++) {
		result.push(expansionProduct(c, p[i]));
	}
	
	return result;
}


export  { eMultiplyByConst }
