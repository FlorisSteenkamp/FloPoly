
import { removeLeadingZeros as removeLeadingZeros_ } from "./remove-leading-zeros";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const removeLeadingZeros = removeLeadingZeros_;


/** 
 * Returns the result of subtracting the second polynomial from the first in 
 * double precision; (p1 - p2).
 * 
 * @param p1 minuend; the polynomial from which will be subtracted; a polynomial 
 * with coefficients given densely as an array of double floating point numbers 
 * from highest to lowest power, e.g. `[5,-3,0]` represents the 
 * polynomial `5x^2 - 3x`
 * @param p2 subtrahend; the polynomial that will be subtracted
 * 
 * @example
 * subtract([2,3],[4,4]); //=> [-2, -1]
 */
function subtract(p1: number[], p2: number[]): number[] {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = 0;
	let Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result: number[] = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1] || 0;
		let c2 = p2[i+Δd2] || 0;
		result.push(c1 - c2);  
	}
	
	// Ensure the result is a valid polynomial representation
	return removeLeadingZeros(result);
}


export { subtract }
