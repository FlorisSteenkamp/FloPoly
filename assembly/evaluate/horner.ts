
/** 
 * Returns the approximate result of evaluating a univariate polynomial using 
 * Horner's method. 
 */
function Horner(p: f64[], x: f64): f64 {
	let q = p[0]; 
	for (let i=1; i<p.length; i++) {
		q = q*x + p[i];
	}
		
	return q;
}


export { Horner }
