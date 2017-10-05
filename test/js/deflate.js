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
var { equal, deflate } = FloPoly;

describe('deflate', function() {
	it('should correctly deflate some polynomials', 
	function() {
		let p1 = [1, -5, 8, -4];
		let r1 = 2;
		let p2 = [1, -3, 2];
		let r2 = 2;
		let p3 = [1, -1];
		let r3 = 1;
		assert(equal(deflate(p1, r1), [1, -3, 2]));   
		assert(equal(deflate(p2, r2), [1,-1]));
		assert(equal(deflate(p3, r3), [1]));
	});
});
