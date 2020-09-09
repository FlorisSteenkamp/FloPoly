
import { bRemoveLeadingZeros as bRemoveLeadingZeros_ } from "./b-remove-leading-zeros";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bRemoveLeadingZeros = bRemoveLeadingZeros_;


/**
 * Returns the result of adding two polynomials with bigint coefficients.
 * 
 * @param p1 a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * 
 * @example
 * bAdd([1n,2n,3n],[3n,4n]); //=> [1n,5n,7n]
 */
function bAdd(p1: bigint[], p2: bigint[]): bigint[] {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = Δd < 0 ? +Δd : 0;
	let Δd2 = Δd > 0 ? -Δd : 0;
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1] || 0n;
		let c2 = p2[i+Δd2] || 0n;
		result.push(c1 + c2);  
	}
	
	// Ensure the result is a valid polynomial representation
	return bRemoveLeadingZeros(result);
}


export { bAdd }
