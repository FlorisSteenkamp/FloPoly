

/**
 * Computes and returns the greatest common divisor of two integers a and b, 
 * using the [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).
 */
function bGcdInt(a: bigint, b: bigint): bigint {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;

	// The below 2 commented lines represent Euclid's original algorithm.
    //if (a === b) { return a; }
	//return a > b ? gcdInt(a - b, b) : gcdInt(a, b - a);
	
	if (a === 0n) { return b; }
	if (b === 0n) { return a; }

	while (b !== 0n) {
		let t = b;
		b = a % b;
		a = t;
	}

	return a;
}


/**
 * Naively computes and returns the greatest common divisor of 2 or more 
 * integers by taking each integer in turn and calculating the GCD of that 
 * integer and the previously calculated GCD (where the first GCD is simply
 * taken as the first number).
 * 
 * @param vals the integers for which the GCD is to be calculated
 */
function bGcdInts(vals: bigint[]): bigint {
	let vals_ = vals.slice();
    let len = vals_.length;

    // make array of numbers all positive
	for (let i=0; i<len; i++) { 
		vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i]; 
	}
    
	let a = vals_[0];
	for (let i=1; i<len; i++) {
		a = bGcdInt(a, vals_[i]);
    }
    
	return a;
} 


/**
 * * ❗ don't use - too slow - use `bGcdInts` instead ❗
 * 
 * Computes and returns the greatest common divisor of 2 or more integers by 
 * calculating GCDs rescursively using a tree (Divide and Conquer).
 * 
 * * It turns out this method is *slower* than the naive method
 */
function bGcdIntsTree(vals: bigint[]): bigint {
	let vals_ = vals.slice();

    // make array of numbers all positive
	for (let i=0; i<vals_.length; i++) { 
		vals_[i] = vals_[i] < 0n ? -vals_[i] : vals_[i]; 
	}
	
	// Divide and conquer
	while (vals_.length > 1) {
		let newVals = [];
		let len = vals_.length;
		for (let i=0; i<len-1; i += 2) {
			newVals.push(bGcdInt(vals_[i], vals_[i+1]));
		}
		if (len % 2 !== 0) {
			newVals.push(vals_[len-1]);
		}

		vals_ = newVals;
	}
    
	return vals_[0];
} 


export { bGcdInt, bGcdInts, bGcdIntsTree }
