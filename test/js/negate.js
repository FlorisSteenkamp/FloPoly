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
var { equal, negate } = FloPoly;

describe('negate', function() {
	it('should correctly negate some polynomials', 
	function() {
		let p1 = [0.1, -0.2];
		assert(equal(negate(p1), [-0.1, 0.2]));
	});
});