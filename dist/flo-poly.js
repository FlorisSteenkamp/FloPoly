(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloPoly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

let coreOperators = require('./core-operators.js');
let rootOperators = require('./root-operators.js');
let rootBounds    = require('./root-bounds.js');

let { brent, quadraticRoots, /*cubicRoots,*/ } = rootOperators;
let { clip0, evaluate, differentiate, toCasStr, } = coreOperators;
let { 
	rootMagnitudeUpperBound_fujiwara,
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ,
} = rootBounds;

	  
const INF = Number.POSITIVE_INFINITY;


/**
 * <p>Finds a near optimal approximation to the real roots (or those 
 * within a range) of the input polynomial.
 * </p>
 * <p>
 * Only multiple roots of even order that is very close together may be 
 * missed. (This is rarely a problem in practice - in a geometrical 
 * application, for instance, this may mean two objects are barely 
 * touching and returning either, all, or none of the repeated even 
 * roots should not break the algorithm). 
 * </p>
 * 
 * @alias allRoots
 * @param {number[]} p - The polynomial
 * @param {number} a - Lower limit of root values that should be 
 * returned - defaults to -∞
 * @param {number} b - Upper limit of root values that should be 
 * returned - defaults to +∞
 * @returns {number[]} The found roots.
 * @impl_notes
 * @example
 * FloPoly.allRoots([1, -10, 35, -50, 24]); //=> [1, 2.0000000000000036, 3.0000000000000067, 4] 
 */
function allRootsRecursive(p, a, b) {
	p = clip0(p);
	a = a === undefined ? -INF : a;
	b = b === undefined ? +INF : b;
	
	let d = p.length-1;
	let rangeFilter = inRange(a,b);
	
	if (d === 2) {
		return quadraticRoots(p)
		.filter(rangeFilter);
	// Investigate if any numerically stable algorithm could be as fast
	// as this algorithm (i.e by finding cubic roots within quadratic
	// root demarcated intervals via Brent's method. The cubicRoots 
	// algoritm below has been removed since it was numerically 
	// unstable.
	/*} else if (d === 3) {
		return cubicRoots(p)
			.filter(rangeFilter)
			.sort((a,b) => a-b)
	} else if (d > 3) {*/
	} else if (d > 2) {
		// TODO The root bounding function below might have an impact on 
		// performance - it would probably be better to use 
		// positiveRootUpperBound_LMQ or (possibly) even better, the 
		// linear version of it (see paper of Viglas, Akritas and 
		// Strzebonski) and re-calculate bounds on every iteration.
		let lowerBound;
		let upperBound;
		if (a === -INF || b === +INF) {
			//let magnitudeBound = rootMagnitudeUpperBound_fujiwara(p);
			//lowerBound = a === -INF ? -magnitudeBound : a;
			//upperBound = b === +INF ? +magnitudeBound : b;
			
			lowerBound = a === -INF 
				? negativeRootLowerBound_LMQ(p) 
				: a;
			upperBound = b === +INF 
				? positiveRootUpperBound_LMQ(p) 
				: b;
		} else {
			lowerBound = a;
			upperBound = b;
		}
		
		// If the roots of differentiated polynomial is out of range 
		// then the roots of the polynomial itself will also be out of 
		// range.
		let dp = differentiate(p);
		let roots = allRootsRecursive(dp, lowerBound, upperBound)
			.filter(rangeFilter);
		
		if (roots[0] !== lowerBound) {
			roots.unshift(lowerBound); // Not really a root.
		}
		if (roots[roots.length-1] !== upperBound) {
			roots.push(upperBound);    // Not really a root.
		}
		return rootsWithin(p, roots);	
	} else if (d === 1) {
		// Less likely so put near bottom (micro optimization)
		return [-p[1]/p[0]]
		.filter(rangeFilter);
	} else if (d === 0) {
		return []; // y = c -> no roots	
	}

	// Least likely so put at bottom (micro optimization)
	// d === -1
	// y = 0 -> infinite number of roots
	return [];  
}


/**
 * Returns a function that returns true if x is in the range [a,b].
 *  
 * @ignore
 * @param {number} a
 * @param {number} b
 * @returns {function}
 */
function inRange(a, b) {
	return function(x) {
		return x >= a && x <= b;	
	}
}


/**
 * Finds all roots of the given polynomial within the given intervals.
 *  
 * @ignore
 * @param {number[]} p
 * @param {number[]} intervals
 * @returns {number[]} The found roots.
 */
function rootsWithin(p, intervals) {

	let roots = [];
	let peval = evaluate(p);
	
	let prevRoot;
	let a = intervals[0];
	for (let i=1; i<intervals.length; i++) {
		let root; 
		let b = intervals[i];
		
		let evA = peval(a);
		let evB = peval(b);
		
		let k = evA*evB;
		
		if (k === 0) {
			if (evA === 0) {
				root = a;
			} else if (evB === 0 && i === intervals.length-1) {
				root = b;
			}
		} else if (evA*evB < 0) {
			root = brent(peval, a, b);
		}
		
		// Add root if it exists and suppress exact duplicates
		if (root !== undefined && root !== prevRoot) {  
			roots.push(root);
			prevRoot = root;
		}
		
		a = b;
	}
	
	return roots;	
}


module.exports = allRootsRecursive;

},{"./core-operators.js":3,"./root-bounds.js":8,"./root-operators.js":9}],2:[function(require,module,exports){
'use strict'

let coreOperators = require('./core-operators.js');
let rootOperators = require('./root-operators.js');
let Mobius        = require('./mobius.js');
let rootBounds    = require('./root-bounds.js');
		
		
let { brent } = rootOperators;
let { evaluate, 
	  evaluateAt0,
	  negate, 
	  invert, 
	  signChanges,
	  changeVariables, } = coreOperators;
let { positiveRootUpperBound_LMQ,	
	  positiveRootLowerBound_LMQ, } = rootBounds;

	  
/** 
 * DO NOT USE. EXPERIMENTAL.
 * Find all the roots using the VAS algorithm followed by Brent's 
 * method.
 *  
 * @ignore
 * @param {number[]} p - A square-free polynomial.
 * @returns {number[]} The roots.
 **/
function allRootsVAS(p_) {
	// TODO - First remove all zero roots  - The VAS method can't handle 
	// them.
	let p = removeZeroRoots(p_);
	let numZeros = p_.length - p.length;

	// TODO - Next, remove all multiple roots (i.e. do a square-free
	// factorization... - VAS doesn't like them either
	
	let vasRoots = vasRootIntervals(p)
	.map(function(interval) {
		return brent(
				evaluate(p), 
				interval[0], 
				interval[1]
		); 
	});
	
	for (let i=0; i<numZeros; i++) {
		vasRoots.push(0);	
	}
	

	return vasRoots;
}


/**
 * Removes the zero roots from the polynomial.
 * 
 * @ignore
 * @returns {number[]} The deflated polynomial.
 *       
 */
// TODO - improve this function: readability + floating point tolerance
function removeZeroRoots(p_) {
	let p = p_.slice();
	let i = 0;
	while (evaluateAt0(p) === 0) {
		let len = p.length;
		p.pop();
		i++;
	}
	
	return p;	
}


/** 
 * Finds root intervals of a polynomial such that each interval contains
 * exactly one root using the VAS (Vincent–Akritas–Strzeboński) method.
 * 
 * @ignore
 * @see http://www.e-ce.uth.gr/wp-content/uploads/formidable/phd_thesis_vigklas.pdf
 */
// TODO - Square-free factorization ignored for now - duplicate roots 
// could cause an infinite loop - fix by checking if interval becomes
// smaller than a certain threshold.
function vasRootIntervals(p) {

	let positiveIntervals = vasRootIntervalsHelper(
		p,
		[[1,0],[0,1]]
	);
	
	// ONLY COMMENTED BECAUSE IN *OUR* CASE WE DONT CARE ABOUT NEGATIVE ROOTS!!
	/*
	let negativeIntervals = vasRootIntervalsHelper(
		changeVariables(p.slice(), -1, 0), 
		[[1,0],[0,1]]
	)
	.map(function(interval) {
		return negate(invert(interval));
	});
	*/
	
	let intervals = [].concat(
			//negativeIntervals, 
			positiveIntervals
	);
	
	return intervals;
}


/** 
 * Helper function
 * The initial mobius transformation must be [[1,0],[0,1]] = M(x) = x.
 * 
 * @ignore
 */
function vasRootIntervalsHelper(p, mobius) {
	
	// In the Vigklas, Akritas, Strzebonski paper, the steps are marked 
	// as below:
	
	// STEP 1
	let intervals = [];
	let signVariations = signChanges(p);
	
	// STEP 2
	if (signVariations === 0) { // Descartes' rule of signs
		return []; 
	}
	
	// STEP 3
	if (signVariations === 1) {
		let M0 = Mobius.evaluateAt0(mobius);  
		let MI = Mobius.evaluateAtInf(mobius); 
		let MM0 = Math.min(M0, MI);
		let MMI = Math.max(M0, MI);
		if (MMI === Number.POSITIVE_INFINITY) {
			MMI = Mobius.evaluate(
					mobius, positiveRootUpperBound_LMQ(p)
			);
		}

		return [[MM0,MMI]];
	}


	// STEP 4
	let lb = positiveRootLowerBound_LMQ(p);
	
	// STEP 5
	if (lb > 1)  {	
		// p ← p(x + lb)
		p = changeVariables(p, 1, lb);
		
		// M ← M(x + lb)
		mobius = Mobius.changeVariables(mobius, 1, lb);
	}


	// TODO - Include factor of 16 improvement by Strzebonski
	
	// STEP 6 - Look for real roots in (0, 1)
	
	// p01 ← (x + 1)^(deg(p)) *  p(1/(x+1))
	let p01 = changeVariables(invert(p), 1, 1); 
	
	// M01 ← M(1/(x+1))
	let M01 = Mobius.changeVariables(Mobius.invert(mobius), 1, 1);

	// STEP 7 - Is 1 a root?
	let m = Mobius.evaluate(mobius, 1);
	
	// STEP 8 - Look for real roots in (1, ∞)
	
	// p1∞ ← p(x + 1)
	let p1inf = changeVariables(p, 1, 1);
	
	// M1∞ ← M(x + 1)
	let M1inf = Mobius.changeVariables(mobius, 1, 1); 
	
	// STEPS 9 -> 13
	let intervals1 = vasRootIntervalsHelper(p01, M01);	
	let intervals3 = vasRootIntervalsHelper(p1inf, M1inf);	
	
	
	if (evaluate(p)(1) === 0) {
		intervals1.push([m,m]);
	}
	
	return [].concat(intervals1, intervals3); 
}


module.exports = allRootsVAS;

},{"./core-operators.js":3,"./mobius.js":6,"./root-bounds.js":8,"./root-operators.js":9}],3:[function(require,module,exports){
'use strict'

let coreOperators = {
		add,
		subtract,
		multiplyByConst,
		negate,
		differentiate,
		multiply,
		degree,
		evaluate,
		evaluateAt0,
		signChanges,
		invert,
		changeVariables,
		reflectAboutYAxis,
		sturmChain,
		clip,
		clip0,
		deflate,
		maxCoefficient,
		toCasStr,
}


/**
 * Adds two polynomials.
 * 
 * @param {number[]} p1 - The first polynomial
 * @param {number[]} p2 - The second polynomial
 * @returns {number[]} p1 + p2.
 * @example
 * FloPoly.add([1,2,3],[3,4]); //=> [1,5,7]
 */
function add(p1, p2) {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = 0;
	let Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1];
		let c2 = p2[i+Δd2];
		result.push((c1 || 0) + (c2 || 0));  
	}
	
	return clip0(result);
}


/** 
 * Subtracts the second polynomial from first.
 * 
 * @param {number[]} p1 - The polynomial from which will be subtracted
 * @param {number[]} p2 - The polynomial that will be subtracted
 * @returns {number[]} p1 - p2
 * @example
 * FloPoly.subtract([2,3],[4,4]); //=> [-2, -1]
 */
function subtract(p1, p2) {
	// Initialize result array  
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let Δd = d1-d2;
	
	let Δd1 = 0;
	let Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}
	
	let d = Math.max(d1, d2);
	
	// Add coefficients
	let result = [];
	for (let i=0; i<d+1; i++) {
		let c1 = p1[i+Δd1];
		let c2 = p2[i+Δd2];
		result.push((c1 || 0) - (c2 || 0));  
	}
	
	return clip0(result);
}


/**
 * Negate the given polynomial (p -> -p).  
 * 
 * @param {number[]} p - The polynomial
 * @returns {number[]} -p
 * @example
 * FloPoly.negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
function negate(p) {
	return multiplyByConst(-1, p);
}


/**  
 * Differentiates the given polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number[]} D(p)
 * @example
 * FloPoly.differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiate(p) {
	
	let result = [];
	
	let d = p.length - 1;
	for (let i=0; i<d; i++) {
		result.push((d-i) * p[i]);
	}
	
	return result;
}


/** 
 * Multiplies the two given polynomials and returns the result. 
 * 
 * @param {number[]} p1 - The one polynomial.
 * @param {number[]} p2 - The other polynomial.
 * @returns {number[]} p1 * p2
 * 
 * @see https://en.wikipedia.org/wiki/Polynomial_arithmetic 
 * @see https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * @see http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * 
 * @example
 * FloPoly.multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 */
// TODO Currently using O(n^2) algorithm - possibly change to a faster  
// FFT algorithm for high degree polynomials? No, we are interested in
// polynomials of degree 20 or lower.
function multiply(p1, p2) {
	let d1 = p1.length-1;
	let d2 = p2.length-1;
	let d = d1+d2;
	
	let result = new Array(d+1).fill(0);
	for (let i=0; i<d1+1; i++) {
		for (let j=0; j<d2+1; j++) {
			result[d-(i+j)] += (p1[d1-i] * p2[d2-j]); 				
		}
	}

	return clip0(result);
}


/** 
 * Multiplies 2 polynomials by a constant.
 * 
 * @param {number} c - The constant
 * @param {number[]} p - The polynomial
 * @returns {number[]} c*p
 * @example 
 * FloPoly.multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]  
 */
function multiplyByConst(c, p) {
	if (c === 0) { return []; }
	
	let d = p.length-1;
	let result = [];
	for (let i=0; i<d+1; i++) {
		result.push(c*p[i]);
	}
	
	return result;
}


/** 
 * Returns the degree of the polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} 
 * @example 
 * FloPoly.degree([9,8,7,6,5,4,3,2,1]); //=> 9
 */
function degree(p) {
	return p.length-1;
}


/** 
 * Evaluates a univariate polynomial using Horner's method. This 
 * function is curried (see examples below).  
 * 
 * @see https://en.wikipedia.org/wiki/Horner%27s_method
 * @param {number[]} p - The polynomial
 * @param {number} a - The value at which to evaluate the polynomial.
 * @returns {number|function} The result if both parameters are supplied
 * or a function with arity one if only the first parameter is supplied.
 * @example
 * let ev = FloPoly.evaluate([3,2,1]);
 * ev(1); // => 6
 * ev(2); // => 17
 * 		 
 * FloPoly.evaluate([3,2,1], 1); // => 6
 * FloPoly.evaluate([3,2,1], 2); // => 17
 * 
 * FloPoly.evaluate([3,2,1])(1); // => 6
 * FloPoly.evaluate([3,2,1])(2); // => 17
 */
function evaluate(p, a) {
	function evaluate(a) {
		//if p.length === 0 { return 0; }
		let result = p[0]; 
		for (let i=1; i<p.length; i++) {
			result = p[i] + result*a;
		}
		
		return result;
	}

	// Curry the function
	return a === undefined ? evaluate : evaluate(a); 
}


/** 
 * Evaluates the given polynomial at 0 - it is much faster than at an 
 * arbitrary point. 
 *  
 * @param {number[]} p - The polynomial
 * @returns {number}
 * @example
 * FloPoly.evaluateAt0([3,2,99]); //=> 99
 */
function evaluateAt0(p) {
	return p[p.length-1];
};


/** 
 * <p>
 * Returns the number of sign changes in the polynomial coefficents 
 * when ordered in descending order; zeros are ignored.
 * </p>
 * <p>
 * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable 
 * exponent, then the number of positive roots of the polynomial is 
 * either equal to the number of sign differences between consecutive 
 * nonzero coefficients, or is less than it by an even number. Multiple 
 * roots of the same value are counted separately."
 * </p>
 * @see https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} The number of sign changes.
 * @example
 * FloPoly.signChanges([1,2,-3,0,0,3,-1]); //=> 3
 */
function signChanges(p) {
	let d = p.length-1;

	let result = 0;
	let prevSign = Math.sign(p[0]);
	for (let i=1; i<d+1; i++) {
		let sign = Math.sign(p[i]);
		
		if (sign !== prevSign && sign !== 0) {
			result++;
			prevSign = sign;
		}
	}
	
	return result;
}


/**
 * Deflates the given polynomial by removing a factor (x - r), where
 * r is a root of the polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @param {number} root - A pre-calculated root of the polynomial.
 * @returns {number[]} The deflated polynomial.
 * @example
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2 
 * FloPoly.deflate([1, -5, 8, -4], 2); //=> [1, -3, 2] 
 * FloPoly.deflate([1, -3, 2], 2);     //=> [1,-1] 
 * FloPoly.deflate([1, -1], 1);        //=> [1]
 */
function deflate(p, root) {
	let d = p.length-1;
	let bs = [p[0]];
	for (let i=1; i<p.length-1; i++) {
		bs.push(
			p[i] + root*bs[i-1]
		);
	}

	return bs;
}


/**
 * Inverts the given polynomial by reversing the order of the 
 * coefficients.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} p(x) -> x^deg(p) * p(1/x)
 * @example
 * FloPoly.invert([1,2,3,4]); // => [4,3,2,1]
 * FloPoly.invert([3,2,-5]);  // => [-5,2,3]
 */
function invert(p) {
	return p.slice().reverse();
}


/** 
 * Performs a change of variables of the form: p(x) <- p(ax + b).
 * @see http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * 
 * @param {number[]} p - The polynomial
 * @param {number} a
 * @param {number} b
 * @returns {number[]} The transformed polynomial.
 * @example
 * FloPoly.changeVariables([1,2,7], 3, 4); //=> [9, 30, 31]
 */
function changeVariables(p, a, b) {
	// We let the coefficients of p(ax + b) be denoted by d_i in the 
	// code below. 
	// d_i is calculated as d = T*c, where c are the original 
	// coefficients.
	 
	let d = p.length-1;
	
	// Initialize a zero matrix
	let t = [];
	for (let i=0; i<d+1; i++) {
		t.push(new Array(d+1).fill(0));
	}

	// Calculate the triangular matrix T
	t[0][0] = 1;
	for (let j=1; j<=d; j++) {
		t[0][j] = b*t[0][j-1];
		for (let i=1; i<=j; i++) {
			t[i][j] = b*t[i][j-1] + a*t[i-1][j-1];
		}
	}
	
	// Multiply
	let res = new Array(d+1).fill(0);
	for (let i=0; i<=d; i++) {
		res[d-i] = 0;
		for (let j=i; j<=d; j++) {
			let acc = t[i][j] * p[d-j];
			res[d-i] += acc;
		}
	}
	
	return res;
}


/**
 * Reflects the given polynomial about the Y-axis, i.e. perform the 
 * change of variables: p(x) <- p(-x).
 * 
 * @param {number[]} p - The polynomial to reflect
 * @returns {number[]} The reflected polynomial.
 * @example
 * FloPoly.reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 */
function reflectAboutYAxis(p) {
	let d = p.length-1;

	let result = p.slice();
	for (let i=0; i<d+1; i++) {
		if (i % 2) {
			result[i] = -result[i]; 
		}
	}
	
	return result;
}


/** 
 * Generates a sturm chain for the given polynomial.
 * 
 * @see https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * @param {number[]} p - The polynomial
 * @returns {number[][]} The sturm chain of polynomials
 * @example
 * FloPoly.sturmChain([-3,4,2,-2]); //=> [[-3, 4, 2, -2], [-9, 8, 2], [-2.5185185185185186, 1.7037037037037037], [-3.2932525951557086]]
 */
function sturmChain(p) {
	
	/** 
	 * Returns the negative of the remainder when dividing the first 
	 * polynomial (the dividend) by the second (the divisor) provided 
	 * that deg(p1) - deg(p2) === 1.
	 * 
	 * @ignore
	 * @param {number[]} p1 - The first polynomial (dividend)
	 * @param {number[]} p2 - The second polynomial (divisor)
	 * @see https://en.wikipedia.org/wiki/Sturm%27s_theorem
	 */
	function negRemainder(p1, p2) {
		let d1 = p1.length-1;
		let d2 = p2.length-1;
		let d = d1-d2;
		
		let a = p1[1]/p1[0] - p2[1]/p2[0];
		let b = p1[0]/p2[0];
		
		let p3 = multiply(
				multiplyByConst(b, p2), 
				[1, a]
		);
		
		return subtract(p3, p1);
	}
	
	
	let m = []; // Sturm chain
	m.push(p);
	m.push(differentiate(p));

	//const δ = 10 * Number.EPSILON;
	let i = 1;
	while (m[i].length-1 > 0) {
		let pnext = negRemainder(m[i-1], m[i]);
		//pnext = clip(pnext, δ);
		// If the polynomial degree was not reduced due to roundoff
		// such that the first 1 or more terms are very small.
		while (m[i].length - pnext.length < 1) {
			pnext.shift(); 
		}
		/*
		if (pnext.length === 0) {
			break;
		}
		*/
		m.push(pnext);
		
		i++;
	}
	
	return m;
}


/**
 * If the highest power coefficient is small in the sense that the 
 * highest power term has a negligible contribution (compared to the
 * other terms) at x = 1 then clip() can be called to remove all such 
 * highest terms. A contribution of less than Number.EPSILON of the 
 * highest coefficient will be considered negligible by default.
 * 
 * 
 * @param {number[]} p - The polynomial to be clipped.
 * @param {number} δ_ - The optional contribution tolerence else 
 *        Number.EPSILON will be used by default.   
 * @returns {number[]} The clipped polynomial.
 * @example
 * FloPoly.clip([1e-18, 1e-10, 1e-5]); //=> [1e-18, 1e-10, 1e-5] 
 * FloPoly.clip([1e-18, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function clip(p, δ_) {
	
	let δ = δ_ === undefined ? Number.EPSILON : δ_;  
	
	let d = p.length-1;
	
	let c = maxCoefficient(p);
	if (c === 0) { return []; }
	
	if (Math.abs(p[0]) > δ*c) {
		return p;
	}
	
	return clip(p.slice(1));
}


/**
 * If the highest power coefficient is 0 then clip() can be called to 
 * remove all such highest terms so that the array is a valid 
 * presentation of a polynomial.
 * 
 * @param {number[]} p - The polynomial to be clipped.
 * @returns {number[]} The clipped polynomial.
 * @example
 * FloPoly.clip0([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * FloPoly.clip0([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function clip0(p) {
	return p[0] !== 0 ? p : clip0(p.slice(1)); 
}


/**
 * Returns the absolute value of the highest coefficient of the 
 * polynomial.
 * 
 * @param p {number[]} p - The polynomial.
 * @returns {number}
 * @example
 * FloPoly.maxCoefficient([-2, 0.1, 0.2]); //=> 2
 */
function maxCoefficient(p) {
	let max = 0;
	for (let i=0; i<p.length; i++) {
		let c = Math.abs(p[i]);
		if (c > max) {
			max = c;
		}
	} 
	
	return max;
}


/**
 * Returns a string representing the given polynomial that is readable 
 * by a human or a CAS (Computer Algebra System).
 * 
 * @param {number[]} p - The polynomial
 * @returns {string}
 * @example
 * FloPoly.toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 */
function toCasStr(p) {
	let d = p.length-1;
	
	let str = '';
	for (let i=0; i<d+1; i++) {
		let cStr = p[i].toString();
		if (i === d) {
			str += cStr;
		} else if (i === d-1) {
			str += 'x*' + cStr + ' + ';
		} else {
			str += 'x^' + (d-i).toString() + '*' + cStr + ' + ';
		}
	}
	
	return str;
}


module.exports = coreOperators;

},{}],4:[function(require,module,exports){
'use strict'

let coreOperators = require('./core-operators.js');

let errorAnalysis = {
	hornerErrorBound		
}

let { evaluate } = coreOperators;


/**
 * <p>
 * Approximate condition number for polynomial evaluation multiplied
 * by the exact value of the polynomial evaluation.
 * </p>
 * <p>
 * See <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">Compensated Horner Scheme - paragraph 1.1</a>
 * </p>
 * 
 * @ignore
 * @param {number[]} p - The polynomial
 * @param {number} x - The evaluation point
 * @returns {number} The condition number multiplied exact polynomial 
 * value at x
 */
function conditionNumber(p, x) {
	let d = p.length-1;
	let res = 0;
	
	for (let i=0; i<d; i++) {
		res += Math.abs(p[i] * Math.pow(x,d-i));
	}
	
	return res;
}

/**
 * <p>
 * Classic rule of thumb approximate error bound using Horner's method 
 * to evaluate polynomials. 
 * </p>
 * <p>
 * http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf
 * </p>
 * @param p {number[]} - The polynomial
 * @param x {number} - Value at which polynomial is evaluated. 
 * @returns {number} The error bound
 */
function hornerErrorBound(p, x) {
	const δ = Number.EPSILON;
	
	//let pres = evaluate(p,x);
	//console.log(pres);
	
	let d = p.length-1;
	let res = 2*d*δ * conditionNumber(p, x)
	//console.log(res);

	return res;
}

module.exports = errorAnalysis;











},{"./core-operators.js":3}],5:[function(require,module,exports){
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


},{"./all-roots-recursive.js":1,"./all-roots-vas.js":2,"./core-operators.js":3,"./error-analysis.js":4,"./random.js":7,"./root-bounds.js":8,"./root-operators.js":9}],6:[function(require,module,exports){
'use strict'

/** 
 * Mobius namespaced functions, i.e. M(x) = (ax + b) / (cx + d) where 
 * a,b,c and d are constants. Represented as a 2-diminsional array 
 * [[a,b],[c,d]].
 * 
 * @ignore
 * @namespace
 */
let Mobius = {};


/**
 * Performs a change of variables x → ax + b on p(x) where
 * it is a precondition on the polynomial p that deg(p) = 1.
 *
 * @ignore
 * @param {number[]} p - The degree 1 polynomial p(x)
 * @param {number} a
 * @param {number} b
 * @returns {number[]} The modified polynomial p(ax + b). 
 */
function changeVariables1(p, a, b) {
	return [
		a*p[0],
		p[1] + b*p[0]
	];
}


/**
 * Performs a change of variables x → px + q on the given Mobius 
 * function. 
 *
 * @ignore
 * @param {number[][]} mobius - The mobius function 
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @param {number} a
 * @param {number} b
 * @returns {number[][]} The modified mobius function 
 * M(x) = (a(px + q) + b) / (c(px + q) + d). 
 */
Mobius.changeVariables = function(mobius, a, b) {
	return [
		changeVariables1(mobius[0], a, b), 
		changeVariables1(mobius[1], a, b)
	];
}


/**
 * Inverts the given mobius, i.e.
 * M(x) = (ax + b) / (cx + d) → (bx + a) / (dx + c)
 * 
 * @ignore
 * @param {number[][]} mobius - The mobius function 
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns {number[][]} The modified mobius function. 
 */
Mobius.invert = function(mobius) {
	let [[a, b],[c, d]] = mobius;
	
	return [[b, a],	[d, c]];
}


/**
 * Evaluates the given mobius function at x = 0.
 * 
 * @ignore
 * @param {number[][]} mobius - The mobius function 
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns {number} The result of the evaluation.
 */
Mobius.evaluateAt0 = function(mobius) {
	return mobius[0][1] / mobius[1][1];
}


/**
 * Evaluates the given mobius function in the limit as x → ∞.
 * 
 * @ignore
 * @param {number[][]} mobius - The mobius function 
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns {number} The result of the evaluation.
 */
Mobius.evaluateAtInf = function(mobius) {
	return mobius[0][0] / mobius[1][0];
}


/**
 * Evaluates the given mobius function at a specific x.
 * 
 * @ignore
 * @param {number[][]} mobius - The mobius function
 * @param {number} x - The x value at which to evaluate
 * M(x) = (ax + b) / (cx + d) represented as [[a,b],[c,d]]
 * @returns {number} The result of the evaluation.
 */
Mobius.evaluate = function(mobius, x) {
	let [[a, b],[c, d]] = mobius;
	
	return (a*x + b) / (c*x + d);   
}


module.exports = Mobius;

},{}],7:[function(require,module,exports){
'use strict'

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
	seed = seed || SEED;
	odds = odds || 0;
	
	let vs = [];
	for (let i=0; i<n; i++) {
		seed = predictiveRandom(seed);
		let v = ((seed/RANGE) * (b-a)) + a;
		seed = push(seed, vs, v, odds);
	}
	vs = vs.slice(0,n);

	return { vs, seed, };
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
	a = a || 0;
	b = b || 1;
	seed = seed || SEED;
	odds = odds || 0;
	
	let randArr = randomArray(d, a, b, seed, odds);
	seed = randArr.seed;
	
	let p = FloPoly.fromRoots(randArr.vs);

	return { p, seed, };
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
	a = a || -1;
	b = b || 1;
	seed = seed || SEED;
	
	let randArr = randomArray(d, a, b, seed);
	seed = randArr.seed;
	
	let p = randArr.vs;
	
	return { p, seed, };
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
		seed = seed || SEED;
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

},{}],8:[function(require,module,exports){
'use strict'

let coreOperators = require('./core-operators.js');

let { invert, negate, reflectAboutYAxis } = coreOperators;


let rootBounds = {
		rootMagnitudeUpperBound_fujiwara,
		positiveRootUpperBound_LMQ,
		positiveRootLowerBound_LMQ,
		negativeRootUpperBound_LMQ,
		negativeRootLowerBound_LMQ
}


/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * of the given polynomial using the near-optimal Fujiwara bound.
 * 
 * @see https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#cite_note-Fujiwara1916-4
 * 
 * @param {number[]} p - The polynomial.
 * @returns {number} The bounds.
 * @note Not yet adjusted for floating-point error. Tight bounds but
 * slow due to usage of Math.pow.
 * @example
 * FloPoly.rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * FloPoly.allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
function rootMagnitudeUpperBound_fujiwara(p) {
	let d = p.length-1;
	
	let an = p[0];
	let bs = [];
	
	for (let i=1; i<d; i++) {
		let b = Math.pow(
				Math.abs(p[i] / an), 
				1/i
		);
		bs.push(b);
	}
	
	bs.push( 
		Math.pow(
			Math.abs(p[d] / 2*an), 
			1/d
		) 
	);
	
	return 2*Math.max.apply(undefined, bs);
}


/**
 * <p> 
 * Returns an upper bound for the positive roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>  
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * FloPoly.positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p) {
	let deg = p.length-1;
	if (deg < 1) { return 0; }
	
	if (p[0] < 0) { p = negate(p); }
	
	let timesUsed = [];
	for (let i=0; i<deg; i++) {
		timesUsed.push(1);
	}
	
	let ub = 0;
	
	for (let m=0; m<=deg; m++) {
		if (p[m] >= 0) continue;
		
		let tempub = Number.POSITIVE_INFINITY;
		let any = false;
		
		for (let k=0; k<m; k++) {
			if (p[k] <= 0) { continue; }
		
			// TODO - Both these pows can easily be replaced with a 
			// lookup that may speed things up a lot since (for low 
			// order polys) it will most of the time be a square, 
			// cube... root or multiplication by 1,2,4,8,...
			let temp = Math.pow(
					-p[m] / (p[k] / Math.pow(2, timesUsed[k])), 
					1/(m-k)
			);
			
			timesUsed[k]++;
			
			if (tempub > temp) { tempub = temp; }
			
			any = true;
		}
		
		if (any && ub < tempub)  
			ub = tempub;
	}
	
	return ub;
}


/**
 * <p> 
 * Calculates a lower bound for the positive roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>
 *  
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootLowerBound_LMQ([2,-3,6,5,-130]); //=> 1.6883241876925903
 * FloPoly.positiveRootLowerBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootLowerBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootLowerBound_LMQ(p) {
	let ub = positiveRootUpperBound_LMQ(invert(p));
	if (ub === 0) { return 0; }
	return 1 / ub;
}


/**
 * See positiveRootUpperBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} An upper bound.
 */
function negativeRootUpperBound_LMQ(p) {
	return -positiveRootLowerBound_LMQ(reflectAboutYAxis(p));
}


/**
 * See positiveRootLowerBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 */
function negativeRootLowerBound_LMQ(p) {
	return -positiveRootUpperBound_LMQ(reflectAboutYAxis(p));
}


module.exports = rootBounds;

},{"./core-operators.js":3}],9:[function(require,module,exports){
'use strict'

let coreOperators = require('./core-operators.js');

/**
 * Operators (i.e. functions) directly related to roots and root 
 * finding. 
 * 
 * @ignore
 */
let rootOperators = {
		quadraticRoots,
		//cubicRoots,
		numRootsWithin,
		brent,
		coreOperators,
};


let { sturmChain, evaluate, signChanges } = coreOperators;


/**
 * Floating-point-stably calculates and returns the ordered quadratic 
 * roots of the given quadratic polynomial.
 * 
 * @param {number[]} p - The 2nd order polynomial
 * @returns {number[]} The found quadratic roots.
 * @example 
 * FloPoly.quadraticRoots([1, -3, 2]); //=> [1,2]
 */
function quadraticRoots(p) {
	let [a,b,c] = p;
	
	let delta = b*b - 4*a*c;
	
	if (delta < 0) {
		// No real roots;
		return []; 
	}
	
	if (delta === 0) {
		return [-b / (2*a)];
	}
	
	delta = Math.sqrt(delta);
	
	let root1;
	let root2;
	if (b >= 0) {
		root1 = (-b - delta) / (2*a);
		root2 = (2*c) / (-b - delta);
	} else {
		root1 = (2*c) / (-b + delta);
		root2 = (-b + delta) / (2*a);
	}
	
	if (root1 < root2) { 
		return [root1, root2];	
	}
	return [root2, root1];
}


/**
 * Calculates the roots of the given cubic polynomial.
 * 
 * This code is mostly from the Pomax guide found at
 * https://pomax.github.io/bezierinfo/#extremities
 * 
 * @param {number[]} p - A cubic polynomial.
 * @returns {number[]} 1,2 or 3 roots.
 */
// TODO - This function as it currently stands is very sensitive to
// the first coefficient if it is very small, e.g. compare:
// cubicRoots([1e-5, 1560,-1740,96]) = [1.1903631761670113, -156000001.1153846, -0.07497859001159668] 
// vs
// quadraticRoots([1560,-1740,96]) = [0.05821032751613551, 1.0571742878684798]
// It is completely useless in some ranges of its input domain:
// the part of the function 'if (discriminant < 0) {}'
// is highly problematic for numerical stability.
// Simply use allRoots / allRootsRecursive instead.
/*
function cubicRoots(p) {

	function cuberoot(v) {
		return v < 0 
			? -Math.pow(-v, 1/3)
		    : +Math.pow(v, 1/3);
	}
	
	let cbrt = Math.cbrt || cuberoot;
	
	let d = p[0];
	let a = p[1] / d;
	let b = p[2] / d;
	let c = p[3] / d;
	
	let s  = (3*b - a*a) / 9;
	let q  = (2*a*a*a - 9*a*b + 27*c) / 54;
	
	let s3 = s*s*s;
	let q2 = q*q;
	
	let discriminant = q2 + s3;

	if (!Number.isFinite(discriminant)) {
		
		// Overflow occured - in which case one root will be very large. 
		// We might want to report such large roots as positive or
		// negative infinity but since they are rarely of interest we
		// report only the smaller roots.
		
		// Here q*q   === (729*c^2 - 486*a*b*c + 108*a^3*c + 81*a^2*b^2 - 36*a^4*b + 4*a^6) / (729*4)
		// and  s*s*s === (27*b^3 - 27*a^2*b^2 + 9*a^4*b - a^6) / (729*1)
		
		return quadraticRoots(p.slice(1)); 
	}
	
	if (discriminant < 0) {
		// three real roots
		
		let r = Math.sqrt(-s3);
		let t = -q / r;
		
		let cosphi = t < -1 ? -1 : t > 1 ? 1 : t;
		let phi    = Math.acos(cosphi);
		let	t1     = 2*cbrt(r);
		
		let ao3 = a/3; 
		
		return [
			t1*Math.cos((phi            )/3) - ao3, 
			t1*Math.cos((phi + 2*Math.PI)/3) - ao3, 
			t1*Math.cos((phi + 4*Math.PI)/3) - ao3
		]
	} else if (discriminant === 0) {
		// three real roots, but two of them are equal
		
		let u1 = q < 0 ? cbrt(-q) : -cbrt(q);
		let ao3 = a/3;
		
		return [
			2*u1 - ao3, 
			-u1 - ao3
		];
	} else {
		// one real root, two complex roots
		
		let sd = Math.sqrt(discriminant);
		let u1 = cbrt(sd - q);
		let v1 = cbrt(sd + q);
		
		return [u1 - v1 - a/3];
	}
}
*/


/** 
 * Returns the number of real roots in the interval (a,b) of the given 
 * polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @param {number} a - The lower bound
 * @param {number} b - The upper bound
 * @returns {number} The number of roots in the given interval
 * @example 
 * let p = [1, 1, -64, 236, -240];
 * FloPoly.numRootsWithin(p,-20,-11); //=> 0
 * FloPoly.numRootsWithin(p,-11,-9);  //=> 1  
 * FloPoly.numRootsWithin(p,-11,3.5); //=> 3
 * FloPoly.numRootsWithin(p,-11,5);   //=> 4
 */ 
function numRootsWithin(p, a, b) {
	let ps = sturmChain(p);
	let ev = evaluate(p);
	let as = ps.map(p => evaluate(p)(a));
	let bs = ps.map(p => evaluate(p)(b));
	
	return signChanges(as) - signChanges(bs);
}


/**
 * <p>
 * Searches an interval (a,b) for a root (i.e. zero) of the 
 * given function with respect to its first argument using the Brent's 
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed. 
 * </p>
 * <p>
 * Brent's Method is an excellent root-finding choice since it is
 * (1) guaranteed to converge (unlike the Newton and other so-called 
 * single-point methods), (2) converges in a reasonable number of 
 * iterations even for highly contrived functions (unlike Dekker's 
 * Method) and (3) nearly always converges extremely fast, i.e. super-
 * linearly (unlike the Secant and Regula-Falsi methods).
 * </p>
 * <p>
 * The max error, δ, is set equal to 2*Number.EPSILON*Math.abs(b) 
 * + Number.EPSILON after each iteration where b is the current best 
 * guess. A much larger δ of say 1e-10 does not really make sense
 * for polynomials since nearly always by that stage convergence 
 * proceeds superlinearly and by the next iteration a δ of
 * around Number.EPSILON is achieved. On the other hand, a δ of 
 * much less than Number.EPSILON is sometimes useful, say for finding  
 * the root of the polynomial x**2 - 3*x*1e-13 + 2*1e-26 to within less
 * than 1e-15, but this is rare enough not to be considered in this 
 * implementation. (For JavaScript doubles Number.EPSILON === 
 * 2.220446049250313e-16 and since b is typically around 1 the max δ 
 * will be about 3*2.220446049250313e-16 or about 1e-15. As another 
 * example, a root near -1000 will have a max error, i.e. δ, of 
 * about 1e-12. In conclusion, for roots near zero the error can be up
 * to Number.EPSILON or about 1e-15 - we don't bother to calculate the
 * root more accurately than this since it may require up to 4 or 5 
 * additional iterations.
 * </p>
 * <p> 
 * See <a href="https://en.wikipedia.org/wiki/Brent%27s_method">Wikipedia</a>
 * </p>
 * <p>
 * See <a href="https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf">Brent (page 47)</a>
 * </p>
 * @param {function} f - The function for which the root is sought.
 * @param {number} a - The lower limit of the search interval.
 * @param {number} b - The upper limit of the search interval.
 * @returns {number} An estimate of the root to within δ (typically 
 * about 1e-15).
 * @example
 * let p = FloPoly.fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = FloPoly.evaluate(p);
 * FloPoly.brent(f,2.2,3.8); //=> 3.000000000000003
 * FloPoly.brent(f,2.2,3.1); //=> 3.000000000000001
 */
function brent(f, a, b) {
	const EPS = Number.EPSILON; 
	
	if (a === b) {
		// Presumably the root is already found.
		return a; 
	} 
	
	// We assume on the first iteration f(a) !== 0 && f(b) !== 0. 
	let fa = f(a);
	let fb = f(b);
    
	if (fa*fb > 0) {
    	// Root is not bracketed - this is a precondition.
    	throw 'Root not bracketed'; 
    } 
    
    let c; // Value of previous guess - set to a initially 
    if (Math.abs(fa) < Math.abs(fb)) { 
    	// Swap a,b
    	c = a;  a = b;	b = c;
    	
    	// Swap fa,fb
    	let temp = fa;
    	fa = fb;
    	fb = temp;
    }
    
    c = a;
    
    let mflag = true;
    let d; // Value of guess before previous guess
    while (true) {
    	let δ = 2*EPS*Math.abs(b) + EPS;
    	
    	let fc = f(c);
    	
    	// Calculate provisional interpolation value
    	let s;
    	if (fa !== fc && fb !== fc) { 
    		// 3 points available - inverse quadratic interpolation
    		let fac = fa - fc;
    		let fab = fa - fb;
    		let fbc = fb - fc;
    		
    		// The below has been multiplied out to speed up the algorithm.
    		/*s = ((a * fb * fc) / ( fab * fac)) +
    			  ((b * fa * fc) / (-fab * fbc)) +
    			  ((c * fa * fb) / ( fac * fbc));*/
    		s = ((a*fb*fbc - b*fa*fac)*fc + c*fa*fab*fb) / (fab*fac*fbc);
    	} else {
    		// only 2 points available - secant method
    		s = b - (fb * ((b-a)/(fb-fa)));
    	}
    	
    	let t1 = (3*a + b) / 4;
    	let b_c = Math.abs(b-c);
    	let s_b = Math.abs(s-b);
    	let c_d = Math.abs(c-d);
    	
    	if (
    		(!( // condition 1
    			(s > t1 && s < b) ||
    			(s < t1 && s > b)
    		)) || 
    		(mflag && ( 
   				// condition 2
    			(s_b >= b_c/2) ||
    			// condition 4
    			(b_c < δ) 
    		)) || 
    		(!mflag && (
   				// condition 3
    			(s_b >= c_d/2) ||
    			// condition 5
    			(c_d < δ) 
    		))
    	) {
    		// Bisection
    		s = (a + b) / 2;
    		mflag = true;
    	} else {
    		mflag = false;
    	}
    	
    	let fs = f(s);
    	
    	d = c;
    	c = b;
    	
    	if (fa*fs < 0) { b = s; } else { a = s; }
    	
    	if (Math.abs(fa) < Math.abs(fb)) { 
    		// Swap a,b
    		let temp = a;  a = b;  b = temp;
    	}
	    
	    if (fb === 0) { return b; } 
	    if (fs === 0) { return s; }

	    if (Math.abs(a - b) <= δ) {
	    	return b; 
	    }
	    
	    fa = f(a);
    	fb = f(b);
    }
}


module.exports = rootOperators;

},{"./core-operators.js":3}]},{},[5])(5)
});