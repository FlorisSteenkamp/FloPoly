'use strict'

let coreOperators     = require('./core-operators.js');
let rootOperators     = require('./root-operators.js');
let rootBounds        = require('./root-bounds.js');
//let allRootsVAS       = require('./all-roots-vas.js');
let allRootsRecursive = require('./all-roots-recursive.js');
let random    		  = require('./random.js');
let errorAnalysis     = require('./error-analysis.js');
let fromRoots  		  = require('./from-roots.js');

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
		{ fromRoots },
		{
			allRoots: allRootsRecursive,
			//allRootsVAS,
		},
		errorAnalysis
);


module.exports = exports = FloPoly;
