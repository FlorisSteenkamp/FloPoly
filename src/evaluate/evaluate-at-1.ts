
//import { fastExpansionSum } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { fastExpansionSum } = bigFloatOperators;


/** 
 * Returns the approximate result of evaluating the given polynomial at 1 - it 
 * is much faster than at an arbitrary point. 
 * @param p a polynomial
 */
function evaluateAt1(p: number[]): number {
	let res = 0;
	for (let i=0; i<p.length; i++) {
		res += p[i];
	}

	return res;
}


/** 
 * Returns the exact result of evaluating the given polynomial at 1 - it 
 * is much faster than at an arbitrary point. 
 * @param p a polynomial
 */
function expEvaluateAt1(p: number[][]): number[] {
	let res = p[0];
	for (let i=1; i<p.length; i++) {
		res = fastExpansionSum(res, p[i]);
	}

	return res;
}


export { evaluateAt1, expEvaluateAt1 }
