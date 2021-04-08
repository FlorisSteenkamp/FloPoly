/**
 * If the highest power coefficient of the given polynomial is 0 then 
 * removeLeadingZeros can be called to remove all such highest terms so that 
 * the returned array is a valid presentation of a polynomial.
 * @param p a polynomial whose leading zeros should be removed
 * 
 * @doc
 */
function bRemoveLeadingZeros(p: bigint[]): bigint[] {
	// @ts-nocheck
	let lzCount = 0;
	for (let i=0; i<=p.length-1; i++) {
		if (p[i] !== 0n) {
			break;
		}
		lzCount++;
	}

	if (lzCount !== 0) { 
		p = p.slice(lzCount);
	}

	return p;
}


export { bRemoveLeadingZeros }
