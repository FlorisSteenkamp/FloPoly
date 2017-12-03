'use strict'

var FloPoly;

if (typeof require !== 'undefined') {
	FloPoly = require('../../../node/index.js').default;
}

var { evaluate, hornerErrorBound } = FloPoly;

var helper = {
	rootAccurateEnough,
	rootsAccurateEnough,
	numsWithin
}


/**
 * Helper function. Tests if an array of numbers are all within the 
 * range [a,b] 
 */
function numsWithin(ns, a, b) {
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
function rootAccurateEnough(p, x) {
	let v = Math.abs(evaluate(p,x)); 
	let e = hornerErrorBound(p,x);
	
	//console.log(e/v, v);
	return e-v >= 0;
}

/**
 * Helper function. Tests if all roots of p is close enough to x to be 
 * considered valid.
 */
function rootsAccurateEnough(p, roots) {
	for (let i=0; i<roots.length; i++) {
		if (!rootAccurateEnough(p, roots[i])) {
			return false;
		}		
	}
	
	return true;
}

if (typeof require !== 'undefined') {
	module.exports = helper;	
}

