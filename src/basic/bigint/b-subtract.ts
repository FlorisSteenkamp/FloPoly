
import { bRemoveLeadingZeros as bRemoveLeadingZeros_ } from "./b-remove-leading-zeros";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bRemoveLeadingZeros = bRemoveLeadingZeros_;


/** 
 * Returns the result of subtracting the second polynomial from the first with
 * coefficients given as bigints; (p1 - p2).
 * 
 * @param a minuend; the polynomial from which will be subtracted; a polynomial 
 * with coefficients given densely as an array of bigints 
 * from highest to lowest power, e.g. `[5,-3,0]` represents the 
 * polynomial `5x^2 - 3x`
 * @param b subtrahend; the polynomial that will be subtracted
 * 
 * @example
 * bSubtract([2n,3n],[4n,4n]); //=> [-2n, -1n]
 */
function bSubtract(a: bigint[], b: bigint[]): bigint[] {
	// Initialize result array  
	let da = a.length - 1;
	let db = b.length - 1;
	let Δd = da - db;
	
	let Δd1 = 0;
	let Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}
	
	let d = Math.max(da, db);
	
	// Add coefficients
	let result: bigint[] = [];
	for (let i=0; i<d+1; i++) {
		let c1 = a[i+Δd1] || 0n;
		let c2 = b[i+Δd2] || 0n;
		result.push(c1 - c2);  
	}
	
	// Ensure the result is a valid polynomial representation
	return bRemoveLeadingZeros(result);
}


export { bSubtract }
