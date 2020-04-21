
import { abs, compare } from "flo-numerical";


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
		let v = abs(p[i]);
		if (compare(v, max) > 0) { max = v; }
	} 
	
	return max;
}


export { pInfNorm }
