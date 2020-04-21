
/**
 * Floating-point-stably calculates and returns the ordered quadratic 
 * roots of the given quadratic polynomial.
 * 
 * This function is included only because it might be slightly faster
 * than calling allRoots due to allRoots first checking if the 
 * polynomial is quadratic and checking if the roots are within the
 * given range.
 * @param p the quadratic polynomial
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
	
	if (root1 < root2) { 
		return [root1, root2];	
	}
	return [root2, root1];
}


export { quadraticRoots }
