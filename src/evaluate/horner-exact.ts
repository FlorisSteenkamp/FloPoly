
//import { fastExpansionSum, scaleExpansion, eEstimate } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { fastExpansionSum, scaleExpansion, eEstimate } = bigFloatOperators;


/** 
 * Returns the exact result of evaluating a univariate polynomial using 
 * Horner's method. 
 */
// TODO - could possibly made faster using EFTs on the polynomial
function HornerExact(p: number[][], x: number): number {
	//console.log('qqq')

	//let q = p[0].slice(); 
	let q = p[0];
	for (let i=1; i<p.length; i++) {
		q = fastExpansionSum(p[i], scaleExpansion(q,x));
	}
	
	//return q[q.length-1];
	return eEstimate(q);
}


export { HornerExact }
