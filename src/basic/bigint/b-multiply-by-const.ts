/** 
 * Returns the result of multiplies a polynomial (with bigint coefficients) by 
 * a constant.
 * 
 * @param c a constant
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @doc
 */
function bMultiplyByConst(c: bigint, p: bigint[]): bigint[] {
	if (c === 0n) { return []; }
	
	const d = p.length;
	const r: bigint[] = [];
	for (let i=0; i<d; i++) {
		r.push(c*p[i]);
	}

	return r;
}


export  { bMultiplyByConst }
