
import { removeLeadingZeros as removeLeadingZeros_ } from "./remove-leading-zeros";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const removeLeadingZeros = removeLeadingZeros_;


/** 
 * Returns the result of multiplies a polynomial by a constant in double 
 * precision.
 * 
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example 
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]  
 */
function multiplyByConst(c: number, p: number[]): number[] {
	if (c === 0) { return []; }
	
	const d = p.length;
	const p_: number[] = [];
	for (let i=0; i<d; i++) {
		p_.push(c*p[i]);
	}
	
	// We *have* to clip due to possible floating point underflow
	return removeLeadingZeros(p_);
}


export  { multiplyByConst }
