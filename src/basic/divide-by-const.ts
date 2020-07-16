
import { removeLeadingZeros as removeLeadingZeros_ } from "./remove-leading-zeros";
//import { eSign, expansionProduct } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const removeLeadingZeros = removeLeadingZeros_;
const { eSign, expansionProduct } = bigFloatOperators;


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
	if (eSign(c) === 0) { return [[0]]; }
	
	let d = p.length-1;
	let result = [];
	for (let i=0; i<d+1; i++) {
		result.push(expansionProduct(c, p[i]));
	}
	
	return result;
}*/


export  { divideByConst/*, expMultiplyByConst*/ }
