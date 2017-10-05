'use strict'

let coreOperators = require('./core-operators.js');

let { invert, negate, reflectAboutYAxis } = coreOperators;


let rootBounds = {
		rootMagnitudeUpperBound_fujiwara,
		positiveRootUpperBound_LMQ,
		positiveRootLowerBound_LMQ,
		negativeRootUpperBound_LMQ,
		negativeRootLowerBound_LMQ,
		rootMagnitudeUpperBound_rouche
}


/**
 * Returns the maximum magnitude value within the supplied array of 
 * numbers.
 * @ignore 
 */
function maxAbs(ns) {
	return Math.max.apply(null, ns.map(n => Math.abs(n)));
}


/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's 
 * Theorem with k = n. This function is fast but the bound is not tight.
 * 
 * @param p {number[]} p - The polynomial.
 * @returns {number} The bound.
 */
function rootMagnitudeUpperBound_rouche(p) {
	let d = p.length-1;
	let R = 1 + (1/p[0])*maxAbs(p.slice(1));
	return R;
}


/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * of the given polynomial using the near-optimal Fujiwara bound. Note
 * that the bound includes complex roots. The bound is tight but slow 
 * due to usage of Math.pow().
 * 
 * @see https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#cite_note-Fujiwara1916-4
 * 
 * @param {number[]} p - The polynomial.
 * @returns {number} The bound.
 * @example
 * FloPoly.rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * FloPoly.allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
function rootMagnitudeUpperBound_fujiwara(p) {
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


const POWERS = [
	1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768, 
	65536,131072,262144,524288,1048576,2097152
];
/**
 * <p> 
 * Returns an upper bound for the positive real roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>  
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * FloPoly.positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p) {
	let deg = p.length-1;
	if (deg < 1) { return 0; }
	
	if (p[0] < 0) { p = negate(p); }
	
	let timesUsed = [];
	for (let i=0; i<deg; i++) {
		timesUsed.push(1);
	}
	
	let ub = 0;
	
	for (let m=0; m<=deg; m++) {
		if (p[m] >= 0) continue;
		
		let tempub = Number.POSITIVE_INFINITY;
		let any = false;
		
		for (let k=0; k<m; k++) {
			if (p[k] <= 0) { continue; }

			// Table lookup is about 70% faster but both are
			// extemely fast anyway. 
			// Result is at https://www.measurethat.net/Benchmarks/ShowResult/6610
			let pow = timesUsed[k];
			let powres;
			if (pow > 20) {
				powres = Math.pow(2, pow);
			} else {
				powres = POWERS[pow];
			}
			let temp = Math.pow(
					-p[m] / (p[k] / powres),
					1/(m-k)
			);
			
			timesUsed[k]++;
			
			if (tempub > temp) { tempub = temp; }
			
			any = true;
		}
		
		if (any && ub < tempub)  
			ub = tempub;
	}
	
	return ub;
}


/**
 * <p> 
 * Calculates a lower bound for the positive roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>
 *  
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootLowerBound_LMQ([2,-3,6,5,-130]); //=> 1.6883241876925903
 * FloPoly.positiveRootLowerBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootLowerBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootLowerBound_LMQ(p) {
	let ub = positiveRootUpperBound_LMQ(invert(p));
	if (ub === 0) { return 0; }
	return 1 / ub;
}


/**
 * See positiveRootUpperBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} An upper bound.
 */
function negativeRootUpperBound_LMQ(p) {
	return -positiveRootLowerBound_LMQ(reflectAboutYAxis(p));
}


/**
 * See positiveRootLowerBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 */
function negativeRootLowerBound_LMQ(p) {
	return -positiveRootUpperBound_LMQ(reflectAboutYAxis(p));
}


module.exports = rootBounds;
