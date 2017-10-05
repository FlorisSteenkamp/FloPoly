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
 * Classic rule of thumb approximate error bound when using Horner's 
 * method to evaluate polynomials. 
 * </p>
 * <p>
 * See for instance <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">compensated horner evaluation</a>
 * </p>
 * @param p {number[]} - The polynomial
 * @param x {number} - Value at which polynomial is evaluated. 
 * @returns {number} The error bound
 * @example
 * hornerErrorBound([1.1,2.2,-3.3], 1.5); //=> 5.1292303737682235e-15 
 */
function hornerErrorBound(p, x) {
	const δ = Number.EPSILON;
	
	let d = p.length-1;
	return 2*d*δ * conditionNumber(p, x)
}

module.exports = errorAnalysis;










