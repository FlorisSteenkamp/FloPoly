
/**
 * Returns the negative of the given polynomial (p -> -p).
 * 
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * 
 * @example
 * bNegate([1n, -2n]); //=> [-1n, 2n]
 */
function bNegate(p: bigint[]): bigint[] {
	const p_: bigint[] = [];
	for (let i=0; i<p.length; i++) {
		p_.push(-p[i]);
	}

	return p_;
}


export { bNegate }