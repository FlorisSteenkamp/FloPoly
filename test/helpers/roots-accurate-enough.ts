
import { rootAccurateEnough } from "./root-accurate-enough";


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


export { rootsAccurateEnough }
