/** 
 * Returns the result of evaluating a univariate polynomial using 
 * Horner's method in double precision floating point arithmetic.
 * 
 * * see [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function Horner(p: number[], x: number): number {
	let q = 0; 
	for (let i=0; i<p.length; i++) {
		q = q*x + p[i];
	}
		
	return q;
}
// inlined (with q => E, p => p0)
//let E = p0[0]; for (let i=1; i<p0.length; i++) {E = E*x + p0[i]; }

export { Horner }
