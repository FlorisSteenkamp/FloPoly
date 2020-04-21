
import { removeLeadingZeros } from "./remove-leading-zeros";
import { sign, expansionProduct } from "flo-numerical";


/** 
 * Divides a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 */
function divideByConst(p: number[], c: number): number[] {
	if (c === 0) { return undefined; }
	
	let d = p.length;
	let r = [];
	for (let i=0; i<d; i++) {
		r.push(p[i] / c);
	}
	
	return r;
}


/** 
 * Multiplies a polynomial by a constant.
 * @param c the constant
 * @param p the polynomial
 * @example 
 * multiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]  
 *//*
function expMultiplyByConst(c: number[], p: number[][]): number[][] {
	if (sign(c) === 0) { return [[0]]; }
	
	let d = p.length-1;
	let result = [];
	for (let i=0; i<d+1; i++) {
		result.push(expansionProduct(c, p[i]));
	}
	
	return result;
}*/


export  { divideByConst/*, expMultiplyByConst*/ }
