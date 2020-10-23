
/**
 * Returns an upper bound on the magnitude (absolute value) of the complex 
 * roots of the given polynomial using the near-optimal Fujiwara bound.
 * 
 * * the bound includes complex roots. 
 * * the bound is quite tight
 * 
 * * see [Wikipedia](https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#Other_bounds)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
function rootMagnitudeUpperBound_fujiwara(p: number[]): number {
	if (p.length <= 1) {
		return 0;
	}

	const d = p.length-1;
	
	const an = p[0];
	const bs = [];
	
	for (let i=1; i<d; i++) {
		bs.push( (Math.abs(p[i] / an))**(1/i) );
	}
	bs.push( (Math.abs(p[d] / 2*an))**(1/d) );
	
	return 2*Math.max(...bs);
}


export { rootMagnitudeUpperBound_fujiwara }
