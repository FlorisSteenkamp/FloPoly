
/** 
 * Returns the approximate result of evaluating a univariate polynomial using 
 * Horner's method. 
 * 
 * This function is curried (see examples below).  
 * 
 * See https://en.wikipedia.org/wiki/Horner%27s_method
 * @param p a polynomial
 * @param a the value at which to evaluate the polynomial.
 * @example
 * let ev = evaluate([3,2,1]);
 * ev(1); // => 6
 * ev(2); // => 17
 * 		 
 * evaluate([3,2,1], 1); // => 6
 * evaluate([3,2,1], 2); // => 17
 * 
 * evaluate([3,2,1])(1); // => 6
 * evaluate([3,2,1])(2); // => 17
 */

function evaluate(p: number[], a: number): number;
function evaluate(p: number[]): (a: number) => number;
function evaluate(p: number[], a?: number) {

    function f(a: number): number {
		if (p.length === 0) { return 0; }

		let result = p[0]; 
		for (let i=1; i<p.length; i++) {
			result = p[i] + result*a;
		}
		
		return result;
	}

	// Curry the function
	return a === undefined ? f : f(a); 
}


export { evaluate }
