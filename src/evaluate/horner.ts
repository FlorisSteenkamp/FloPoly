
/** 
 * Returns the approximate result of evaluating a univariate polynomial using 
 * Horner's method. 
 */
function Horner(p: number[], x: number): number {
	let q = p[0]; 
	for (let i=1; i<p.length; i++) {
		q = q*x + p[i];
	}
		
	return q;
}


export { Horner }
