
import { multiplyByConst as multiplyByConst_ } from "./multiply-by-const";
//import { eNegativeOf } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eNegativeOf } = bigFloatOperators;
const multiplyByConst = multiplyByConst_;


/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
function negate(p: number[]): number[] {
	return multiplyByConst(-1, p);
}


/**
 * Returns the negative of the given polynomial (p -> -p).
 * @param p a polynomial
 * @example
 * expNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 */
function expNegate(p: number[][]): number[][] {
	let result: number[][] = [];
	for (let i=0; i<p.length; i++) {
		result.push(eNegativeOf(p[i]))
	}
	return result;
}


export { negate, expNegate }
