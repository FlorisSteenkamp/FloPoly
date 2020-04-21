
import { fastExpansionSum, scaleExpansion, estimate } from "flo-numerical";


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
	return estimate(q);
}


export { HornerExact }
