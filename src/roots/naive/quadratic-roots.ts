
/**
 * Floating-point-stably calculates and returns the ordered quadratic roots of 
 * the given quadratic polynomial.
 * 
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 * * **non-exact:** it is important to note that even though the roots are
 * calculated in a stable way they are still subject to round-off
 * * might be slightly faster than calling `allRoots`.
 * 
 * @param p a quadratic polynomial with coefficients given as an array 
 * of double floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the quadratic `5x^2 - 3x`
 * 
 * @example 
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 */
function quadraticRoots(p: number[]): number[] {
	let [a,b,c] = p;
	
	let D = b*b - 4*a*c;
	
	if (D < 0) {
		// No real roots;
		return []; 
	}
	
	if (D === 0) {
		return [-b / (2*a)];
	}
	
	D = Math.sqrt(D);
	
	let root1;
	let root2;
	if (b >= 0) {
		root1 = (-b - D) / (2*a);
		root2 = (2*c) / (-b - D);
	} else {
		root1 = (2*c) / (-b + D);
		root2 = (-b + D) / (2*a);
	}
	
	return root1 < root2
		? [root1, root2]
		: [root2, root1];
}


export { quadraticRoots }
