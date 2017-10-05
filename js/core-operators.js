'use strict'

let coreOperators = {
		equal,
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
 * Returns true if two polynomials are exactly equal by comparing 
 * coefficients.
 * 
 * @param {number[]} p1 - A polynomial
 * @param {number[]} p2 - Another polynomial 
 * @returns {boolean} True if exactly equal, false otherwise.
 * @example
 * FloPoly.equal([1,2,3,4], [1,2,3,4]);   //=> true
 * FloPoly.equal([1,2,3,4], [1,2,3,4,5]); //=> false
 */
function equal(p1,p2) {
	if (p1.length !== p2.length) { return false; }
	for (let i=0; i<p1.length; i++) {
		if (p1[i] !== p2[i]) { return false; }
	}
	return true;
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
	
	// Ensure the result is a valid polynomial representation
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
	
	// Ensure the result is a valid polynomial representation
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
 * <p> 
 * Multiplies the two given polynomials and returns the result. 
 * </p>
 * <p>
 * See <a href="https://en.wikipedia.org/wiki/Polynomial_arithmetic">polynomial arithmetic</a>
 * </p>
 * <p>
 * See <a href="https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication">polynomial multiplication</a>
 * </p>
 * <p>
 * See <a herf="http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf">polynomial multiplication (pdf)</a>
 * </p>
 * @param {number[]} p1 - The one polynomial.
 * @param {number[]} p2 - The other polynomial.
 * @returns {number[]} p1 * p2
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
	
	// We have to clip due to possible floating point underflow
	return clip0(result);
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
	for (let i=1; i<d; i++) {
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
 * <p> 
 * Performs a change of variables of the form: p(x) <- p(ax + b).
 * </p>
 * <p>
 * See <a href="http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system">this stackoverflow question</a>
 * </p>
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
 * @param {number} δ - The optional contribution tolerence else 
 *        Number.EPSILON will be used by default.   
 * @returns {number[]} The clipped polynomial.
 * @example
 * FloPoly.clip([1e-18, 1e-10, 1e-5]); //=> [1e-18, 1e-10, 1e-5] 
 * FloPoly.clip([1e-18, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function clip(p, δ) {
	δ = (δ === undefined) ? Number.EPSILON : δ;  

	let c = maxCoefficient(p);
	if (c === 0) { return []; }
	
	if (Math.abs(p[0]) > δ*c) {
		return p;
	}
	
	let p_ = p.slice(1);
	while (Math.abs(p_[0]) < δ*c) {
		p_ = p_.slice(1);	
	}
	
	return clip(p_, δ);
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
