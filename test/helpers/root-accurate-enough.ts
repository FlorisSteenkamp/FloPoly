
import { evaluate, hornerErrorBound } from "../../src";


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


export { rootAccurateEnough }
    