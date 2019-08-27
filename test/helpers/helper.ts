
import { evaluate, hornerErrorBound } from '../../src/index';


/**
 * Helper function. Tests if an array of numbers are all within the 
 * range [a,b] 
 */
function numsWithin(ns: number[], a: number, b: number) {
	for (let n of ns) {
		if (n < a || n > b) {
			return false;
		}
	}

	return true;
}


/**
 * Helper function. Tests if a root of p is close enough to x to be 
 * considered valid.
 */
function rootAccurateEnough(p: number[], x: number) {
	let v = Math.abs(evaluate(p,x)); 
	let e = hornerErrorBound(p,x);
	
	//console.log(e/v, v);
	return e-v >= 0;
}


/**
 * Helper function. Tests if all roots of p is close enough to x to be 
 * considered valid.
 */
function rootsAccurateEnough(p: number[], roots: number[]) {
	for (let i=0; i<roots.length; i++) {
		if (!rootAccurateEnough(p, roots[i])) {
			return false;
		}		
	}
	
	return true;
}


export {
	rootAccurateEnough,
	rootsAccurateEnough,
	numsWithin
}
