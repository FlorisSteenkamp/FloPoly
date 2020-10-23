
import { scaleExpansion as scaleExpansion_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const scaleExpansion = scaleExpansion_;


/**  
 * Returns the exact result (bar underflow / overflow) of differentiating the 
 * given polynomial (with Shewchuk expansion coefficients).
 * 
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * eDifferentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 */
function eDifferentiate(p: number[][]): number[][] {
	const result: number[][] = [];
	
	const d = p.length - 1;
	for (let i=0; i<d; i++) {
		result.push(scaleExpansion(p[i], d-i));
	}
	
	return result;
}


export { eDifferentiate }
