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
	FloPoly = require('../../js/flo-poly.js');
}

var { assert, expect } = chai;
var { equal, differentiate } = FloPoly;

describe('differentiate', function() {
	it('should differentiate some polynomials correctly', 
	function() {
		let p = [5, 4, 3, 2, 1];
		assert(equal(differentiate(p), [20, 12, 6, 2]));
	});
});