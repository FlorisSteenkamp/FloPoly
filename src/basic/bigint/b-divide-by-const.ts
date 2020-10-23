
/** 
 * Divides (using **integer division**) a polynomial by a constant.
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param c a constant
 */
function bDivideByConst(p: bigint[], c: bigint): bigint[] {
	const d = p.length;
	const r: bigint[] = [];
	for (let i=0; i<d; i++) {
		r.push(p[i] / c);
	}
	
	return r;
}


export { bDivideByConst }
