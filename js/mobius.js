'use strict'

/** 
 * Mobius namespaced functions, i.e. M(x) = (ax + b) / (cx + d) where 
 * a,b,c and d are constants. Represented as a 2-diminsional array 
 * [[a,b],[c,d]].
 * 
 * @ignore
 * @namespace
 */
let Mobius = {
	changeVariables,
	invert,
	evaluateAt0,
	evaluateAtInf,
	evaluate,	
};


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
function changeVariables(mobius, a, b) {
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
function invert(mobius) {
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
function evaluateAt0(mobius) {
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
function evaluateAtInf(mobius) {
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
function evaluate(mobius, x) {
	let [[a, b],[c, d]] = mobius;
	
	return (a*x + b) / (c*x + d);   
}


module.exports = Mobius;
