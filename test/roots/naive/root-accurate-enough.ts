
import { hornerWithRunningError } from '../../../src/index';


const abs = Math.abs;


/**
 * Helper function. Tests if a root of p is close enough be considered valid.
 */
function rootAccurateEnough(p: number[], x: number) {
	let [r,e] = hornerWithRunningError(p,x);
	let absR = abs(r);
    e = 2*e;  // multiply by a small factor to take interval width into account
    
    // Also, the error can be bigger when the root is smaller than 1 - this is
    // because allRoots use a version of Brent's Method that stops reducing the
	// delta interval below one
	let absX = abs(x);
    if (absX < 1) {
        e = e / absX;
    }

	return absR - e <= 0;
}


export { rootAccurateEnough }
