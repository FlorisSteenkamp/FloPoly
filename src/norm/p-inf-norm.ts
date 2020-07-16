
//import { eAbs, eCompare } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eAbs, eCompare } = bigFloatOperators;


/**
 * Returns the p-infinity norm, i.e. the maximum magnitude absolute value within 
 * the given array of coefficients.
 */
function pInfNorm(p: number[]): number {
    let max = 0;
    for (let i=0; i<p.length; i++) {
        let v = Math.abs(p[i]);
        if (v > max) { max = v; }
    }
    
    return max;
}


/**
 * Returns the absolute value of the highest coefficient of the polynomial.
 * @param p a polynomial.
 */
function expPInfNorm(p: number[][]): number[] {
	let max = [0];
	for (let i=0; i<p.length; i++) {
		let v = eAbs(p[i]);
		if (eCompare(v, max) > 0) { max = v; }
	} 
	
	return max;
}


export { pInfNorm }
