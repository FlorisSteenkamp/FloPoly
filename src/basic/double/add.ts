import { removeLeadingZeros as removeLeadingZeros_ } from "./remove-leading-zeros.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const removeLeadingZeros = removeLeadingZeros_;


/**
 * Returns the result of adding two polynomials in double precision.
 * 
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial
 * 
 * @example
 * ```typescript
 * add([1,2,3],[3,4]); //=> [1,5,7]
 * ```
 * 
 * @doc
 */
function add(p1: number[], p2: number[]): number[] {
	// Initialize result array  
	const d1 = p1.length-1;
	const d2 = p2.length-1;
	const Δd = d1-d2;
	
	const Δd1 = Δd < 0 ? +Δd : 0;
	const Δd2 = Δd > 0 ? -Δd : 0;
	
	const d = Math.max(d1, d2);
	
	// Add coefficients
	const result = [];
	for (let i=0; i<d+1; i++) {
		const c1 = p1[i+Δd1] || 0;
		const c2 = p2[i+Δd2] || 0;
		result.push(c1 + c2);  
	}
	
	// Ensure the result is a valid polynomial representation
	return removeLeadingZeros(result);
}


export { add }
