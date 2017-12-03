
import coreOperators from './src/core-operators';
import rootOperators from './src/root-operators';
import rootBounds    from './src/root-bounds';
import allRoots      from './src/all-roots-recursive';
import random    	 from './src/random';
import errorAnalysis from './src/error-analysis';
import fromRoots  	 from './src/from-roots';


const multiply = coreOperators.multiply;


/**
* Simple & fast practical library functions for functional univariate 
* polynomials over the reals (actually ECMAScript numbers, i.e. double 
* floats).
*
* All polinomials are represented as a simple array starting with the 
* highest non-zero power, e.g. 
*   3x^3 + 5x^2 + 7x + 2 -> [3,5,7,2]
* 
* @ignore
*/
const FloPoly = { 
	...coreOperators,
	...rootOperators,
	...rootBounds,
	...errorAnalysis,
	random,
	fromRoots,
	allRoots,
}


export default FloPoly;
