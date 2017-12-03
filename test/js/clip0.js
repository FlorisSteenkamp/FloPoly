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
var { clip0, equal } = FloPoly;

describe('clip0', function() {
	it('should clip some polynomials correctly', 
	function() {
		let p1 = [   0, 1e-10, 1e-5];
		let p2 = [0, 0, 1e-10, 1e-5];
		
		assert(equal(clip0(p1), [1e-10, 1e-5])); 
		assert(equal(clip0(p2), [1e-10, 1e-5]));
	});
});