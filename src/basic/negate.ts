
import { multiplyByConst } from "./multiply-by-const";
import { negativeOf } from "flo-numerical";


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
		result.push(negativeOf(p[i]))
	}
	return result;
}


export { negate, expNegate }
