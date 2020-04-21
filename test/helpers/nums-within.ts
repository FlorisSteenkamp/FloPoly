
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


export { numsWithin}
