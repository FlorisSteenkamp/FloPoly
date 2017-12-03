'use strict'

var mocha;
var chai;
var FloPoly;

if (typeof require === 'undefined') {
	// Browser
} else {
	// Node
	mocha   = require('mocha');
	chai    = require('chai');
	FloPoly = require('../../node/index.js').default;
}

var { assert, expect } = chai;
var { equal, multiply } = FloPoly;

describe('multiply', function() {
	it('should correctly multiply some polynomials', 
	function() {
		let p1 = [2];
		let p2 = [];
		let p3 = [1,2,3];
		let p4 = [4,4,5,6,7];
		assert(equal(multiply(p1,p3), [2,4,6]));
		assert(equal(multiply(p2,p3), []));
		assert(equal(multiply(p3,p4), [4, 12, 25, 28, 34, 32, 21]));
	});
});