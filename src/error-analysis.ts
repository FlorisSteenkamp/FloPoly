
/**
 * Approximate condition number for polynomial evaluation multiplied by the 
 * exact value of the polynomial evaluation.
 * See Compensated Horner Scheme - paragraph 1.1 
 * http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf
 * @ignore
 * @param p - The polynomial
 * @param x - The evaluation point
 */
function conditionNumber(p: number[], x: number): number {
	let d = p.length-1;
	let res = 0;
	
	for (let i=0; i<d; i++) {
		res += Math.abs(p[i] * Math.pow(x,d-i));
	}
	
	return res;
}


/**
 * Classic rule of thumb approximate error bound when using Horner's 
 * method to evaluate polynomials. 
 * See for instance compensated horner evaluation http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf"
 * @param p - The polynomial
 * @param x - Value at which polynomial is evaluated. 
  * @example
 * hornerErrorBound([1.1,2.2,-3.3], 1.5); //=> 5.1292303737682235e-15 
 */
function hornerErrorBound(p: number[], x: number): number {
	const δ = Number.EPSILON;
	
	let d = p.length-1;
	return 2*d*δ * conditionNumber(p, x)
}


export {
	hornerErrorBound
}
