'use strict'


let fromRoots = require('./from-roots.js');

/**
 * Some seed value for the simple random number generator.
 * @ignore
 */
const SEED = 123456789;

/**
 * The range for the simple random number generator, i.e. the generated
 * numbers will be in [0,RANGE].
 * @ignore
 */
const RANGE = 4294967296;

/**
 * Generates an array of random polynomials with parameters as specified 
 * by flatRoots. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to 
 * improve testability.
 *   
 * @memberof random
 * @param {number} n - The number of polynomials to generate.
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {number[][]} The array of random polynomials.
 * @example
 * FloPoly.random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * FloPoly.random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 */
let flatRootsArr = createArrFunction(flatRoots);

/**
 * Generates an array of random polynomials as specified by 
 * flatCoefficients. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to 
 * improve testability.
 *   
 * @memberof random
 * @param {number} n - The number of polynomials to generate.
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @returns {number[][]} The array of random polynomials.
 * @example
 * FloPoly.random.flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * FloPoly.random.flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 */
let flatCoefficientsArr = createArrFunction(flatCoefficients);
	

let random = {
		flatRoots,
		flatRootsArr,
		flatCoefficients,
		flatCoefficientsArr,
}


/**
 * https://stackoverflow.com/questions/3062746/special-simple-random-number-generator
 * 
 * @ignore
 * @param {number} seed
 * @returns {number} A quasi-random number to be used as the next input 
 * to this function.
 */
function predictiveRandom(seed) {
	const a = 134775813;
	
	return (a * seed + 1) % RANGE;
}


/**
 * Generates a random array of numbers picked from a bounded flat 
 * distribution (i.e. a rectangular distribution) with specified odds of 
 * duplication of consecutive values.
 *   
 * @ignore
 * @param {number} n - The number of values to generate.
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {number[]} - The random array.
 */
function randomArray(n, a, b, seed, odds) {
	seed = (seed === undefined) ? SEED : seed;
	odds = (odds === undefined) ? 0    : odds;
	
	let vs = [];
	for (let i=0; i<n; i++) {
		seed = predictiveRandom(seed);
		let v = ((seed/RANGE) * (b-a)) + a;
		seed = push(seed, vs, v, odds);
	}
	vs = vs.slice(0,n);

	return { vs, seed };
}


/**
 * Helper function that will add more numbers to the passed array - 
 * modifies the values parameter.
 *
 * @ignore
 * @param {number[]} values - An existing array of values - will be 
 * modified!
 * @param {number} x - The number that will be added (possibly
 * multiple times)
 * @param {number} odds - The odds that the number will be added
 * again (recursively). 
 */ 
function push(seed, values, x, odds) {
	seed = predictiveRandom(seed); 
		
	values.push(x);
	if ((seed/RANGE) < odds) {
		seed = push(seed, values, x, odds);
	}
	
	return seed;
}


/**
 * Generates a random polynomial with roots picked from a bounded flat 
 * distribution (i.e. a rectangular distribution) with specified odds of 
 * duplication of consecutive values. Note that the resulting polynomial
 * won't have any complex roots.
 * 
 * @memberof random
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {{p: number[], seed: number}} a random polynomial and the
 * last seed value to reuse.
 * @example
 * FloPoly.random.flatRoots(3,0,10); //=> { p: [1, -17.27247918024659, 97.33487287168995, -179.34094494147305], seed: 939629312 }
 */
function flatRoots(d, a, b, seed, odds) {
	a = (a === undefined) ? 0 : a;
	b = (b === undefined) ? 1 : b;
	seed = (seed === undefined) ? SEED : seed;
	odds = (odds === undefined) ? 0    : odds;
	
	let randArr = randomArray(d, a, b, seed, odds);
	seed = randArr.seed;

	let p = fromRoots(randArr.vs);

	return { p, seed };
}


/**
 * Generates a random polynomial with coefficients picked from a bounded 
 * flat distribution (i.e. a rectangular distribution). 
 * 
 * @memberof random
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to -1
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @returns {{p: number[], seed: number}} a random polynomial and the
 * last seed value to reuse.
 * @example
 * FloPoly.random.flatCoefficients(3,-5,5); //=> { p: [0.437291506677866, -0.5087333917617798, 2.3439210653305054], seed: 939629312 }
 */
function flatCoefficients(d, a, b, seed) {
	a = (a === undefined) ? -1 : a;
	b = (b === undefined) ? +1 : b;
	seed = (seed === undefined) ? SEED : seed;
	
	let randArr = randomArray(d, a, b, seed);
	seed = randArr.seed;
	
	let p = randArr.vs;
	
	return { p, seed };
}


/**
 * Creates a function from the given function with parameters similar
 * to flatRoots but with an extra parameter in the beginning indicating
 * the length of the array generated by the original function.
 * 
 * @ignore
 * @param {function} f
 * @returns {function}
 */
function createArrFunction(f) {
	return function(n, d, a, b, seed, odds) {
		seed = (seed === undefined) ? SEED : seed;
		let res = [];
		
		for (let i=0; i<n; i++) {
			let v = f(d, a, b, seed, odds);
			let p = v.p;
			seed = v.seed;
			
			res.push(p);
		}
		
		return res;
	}
}


module.exports = random;
