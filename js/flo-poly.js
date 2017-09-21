'use strict'

let coreOperators     = require('./core-operators.js');
let rootOperators     = require('./root-operators.js');
let rootBounds        = require('./root-bounds.js');
let allRootsVAS       = require('./all-roots-vas.js');
let allRootsRecursive = require('./all-roots-recursive.js');
let random    		  = require('./random.js');
let errorAnalysis     = require('./error-analysis.js');

let multiply = coreOperators.multiply;


/**
* <p>
* Simple & fast practical library functions for functional univariate 
* polynomials over the reals (actually ECMAScript numbers, i.e. double 
* floats).
* </p>
* <p>
* All polinomials are represented as a simple array starting with the 
* highest non-zero power, e.g. 
*   3x^3 + 5x^2 + 7x + 2 -> [3,5,7,2]
* </p>
* @ignore
*/
let FloPoly = Object.assign({},
		coreOperators,
		rootOperators,
		rootBounds,
		{ random },
		{
			allRoots: allRootsRecursive,
			//allRootsVAS,
			fromRoots,
		},
		errorAnalysis
);


/**
 * <p>
 * Constructs a polynomial from the given roots by multiplying out the 
 * factors (x - root1)(x - root2)... Note that the resulting polynomial 
 * will not have any complex roots.
 * </p>
 * <p>
 * Mostly provided for testing purposes. Note that the real roots of the 
 * constructed polynomial may not be exactly the same as the roots that
 * the polynomial has been constructed from due to floating-point 
 * round-off.
 * </p>
 * 
 * @param {number[]} roots - The roots
 * @returns {number[]} The constructed polynomial.
 * @example
 * FloPoly.fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]
 * FloPoly.allRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]
 * // In the above note the rounding error. Also note the multiple root of 3 that has been missed but as stated previously this does not generally pose a problem for even multiple roots. See the examples below.
 * FloPoly.allRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]
 * FloPoly.allRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]
 */
function fromRoots(roots) {
	let p = [1]; 
	for (let i=0; i<roots.length; i++) {
		p = multiply(p, [1,-roots[i]]);
	}
	
	return p;
}


if (module !== undefined && module.exports !== undefined) {
	// Node
	module.exports = FloPoly;
} else {
	// Browser
	window.FloPoly = FloPoly;
}

