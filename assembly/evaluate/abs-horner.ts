

const abs = Math.abs;


/** 
 * Returns the approximate result of evaluating a univariate polynomial using 
 * Horner's method and where the absolute value of each coefficient is taken. 
 */
function AbsHorner(p: f64[], x: f64): f64 {
	let q = abs(p[0]);
	for (let i=1; i<p.length; i++) {
		q = q*x + abs(p[i]);
	}
		
	return q;
}


export { AbsHorner }
