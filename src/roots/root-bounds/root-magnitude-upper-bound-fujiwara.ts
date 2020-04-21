
/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * of the given polynomial using the near-optimal Fujiwara bound. Note
 * that the bound includes complex roots. The bound is tight but slow 
 * due to usage of Math.pow().
 * See https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#cite_note-Fujiwara1916-4
 * @param p ahe polynomial.
 * @example
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
function rootMagnitudeUpperBound_fujiwara(p: number[]): number {
	let d = p.length-1;
	
	let an = p[0];
	let bs = [];
	
	for (let i=1; i<d; i++) {
		let b = Math.pow(
				Math.abs(p[i] / an), 
				1/i
		);
		bs.push(b);
	}
	
	bs.push( 
		Math.pow(
			Math.abs(p[d] / 2*an), 
			1/d
		) 
	);
	
	return 2*Math.max.apply(undefined, bs);
}


export { rootMagnitudeUpperBound_fujiwara }
