
/** 
 * Returns the exact result of evaluating the given polynomial at 1.
 * 
 * * faster than at an arbitrary point. 
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` 
 * represents the polynomial `5x^2 - 3x`
 */
function bEvaluateAt1(p: bigint[]): bigint {
	let res = 0n;
	for (let i=0; i<p.length; i++) {
		res += p[i];
	}

	return res;
}


export { bEvaluateAt1 }
