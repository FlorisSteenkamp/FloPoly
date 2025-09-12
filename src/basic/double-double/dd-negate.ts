/**
 * Returns the negative of the given polynomial (p -> -p).
 * 
 * @param p a polynomial with coefficients given densely as an array of double-dboule
 * floating point numbers from highest to lowest power
 * 
 * @doc
 */
function ddNegate(p: number[][]): number[][] {
	const p_: number[][] = [];
	for (let i=0; i<p.length; i++) {
		p_.push([-p[i][0], -p[i][1]]);
	}

	return p_;
}


export { ddNegate }
