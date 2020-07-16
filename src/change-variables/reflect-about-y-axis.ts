
//import { eNegativeOf } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eNegativeOf } = bigFloatOperators;


/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e. 
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 */
function reflectAboutYAxis(p: number[]): number[] {
	let d = p.length-1;

	let result = p.slice();
	for (let i=0; i<d+1; i++) {
		if (i % 2) {
			result[i] = -result[i]; 
		}
	}
	
	return result;
}


/**
 * Returns the result of reflecting the given polynomial about the Y-axis, i.e. 
 * perform the change of variables: p(x) <- p(-x).
 * @param p a polynomial to reflect
 * @example
 * expReflectAboutYAxis([[5],[4],[3],[2],[1]]); //=> [[5], [-4], [3], [-2], [1]]
 */
function expReflectAboutYAxis(p: number[][]): number[][] {
	let d = p.length-1;

	let result = p.slice();
	for (let i=0; i<d+1; i++) {
		if (i % 2) {
			result[i] = eNegativeOf(result[i]); 
		}
	}
	
	return result;
}


export { reflectAboutYAxis, expReflectAboutYAxis }
