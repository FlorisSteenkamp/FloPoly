/** 
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 * 
 * @param p a polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */
function ddDegree(p: number[][]): number {
	return p.length-1;
}


export { ddDegree }
