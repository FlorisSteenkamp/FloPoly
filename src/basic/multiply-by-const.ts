
import { removeLeadingZeros } from "./remove-leading-zeros";
import { sign, expansionProduct } from "flo-numerical";


/** 
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example 
 * multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]  
 */
function multiplyByConst(c: number, p: number[]): number[] {
	if (c === 0) { return []; }
	
	let d = p.length;
	let result = [];
	for (let i=0; i<d; i++) {
		result.push(c*p[i]);
	}
	
	// We have to clip due to possible floating point underflow
	return removeLeadingZeros(result);
}


/** 
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example 
 * multiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]  
 */
function expMultiplyByConst(c: number[], p: number[][]): number[][] {
	if (sign(c) === 0) { return [[0]]; }
	
	let d = p.length-1;
	let result = [];
	for (let i=0; i<d+1; i++) {
		result.push(expansionProduct(c, p[i]));
	}
	
	return result;
}


export  { multiplyByConst, expMultiplyByConst }
