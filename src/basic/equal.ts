
//import { eCompare } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eCompare } = bigFloatOperators;


/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial
 * @param p2 another polynomial 
 * @example
 * equal([1,2,3,4], [1,2,3,4]);   //=> true
 * equal([1,2,3,4], [1,2,3,4,5]); //=> false
 */
function equal(p1: number[], p2: number[]): boolean {
	if (p1.length !== p2.length) { return false; }
	for (let i=0; i<p1.length; i++) {
		if (p1[i] !== p2[i]) { return false; }
	}
	return true;
}


/**
 * Returns true if two polynomials are exactly equal by comparing coefficients.
 * @param p1 a polynomial with coefficients given as floatin point expansions
 * @param p2 another polynomial
 * @example
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4]]);   //=> true
 * equal([[1],[2],[3],[4]], [[1],[2],[3],[4],[5]]); //=> false
 */
function expEqual(p1: number[][], p2: number[][]): boolean {
	if (p1.length !== p2.length) { return false; }
	for (let i=0; i<p1.length; i++) {
		if (eCompare(p1[i], p2[i]) !== 0) { return false; }
	}
	return true;
}


export { equal, expEqual }
