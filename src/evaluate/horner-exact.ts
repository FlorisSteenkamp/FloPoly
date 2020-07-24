
import { fastExpansionSum, scaleExpansion, eEstimate } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const fes = fastExpansionSum;
const sce = scaleExpansion;
const est = eEstimate;


/** 
 * Returns the exact result of evaluating a univariate polynomial (with 
 * coefficients being double floating point expansions) using Horner's method. 
 */
function HornerExact(p: number[][], x: number): number[] {
	let q = p[0];
	for (let i=1; i<p.length; i++) {
		q = fes(p[i], sce(q,x));
	}
	
	return q;
}


export { HornerExact }
