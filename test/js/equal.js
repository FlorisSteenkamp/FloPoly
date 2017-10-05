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
var { equal } = FloPoly;

describe('equal', function() {
	it('should check some polynomials are correctly given as equal or not', 
	function() {
		let p1 = [1e10, 1e5];
		let p2 = [1e10, 1e5];
		let p3 = [1e10, 1e6];
		let p4 = [1, 1e10, 1e6];
		let p5 = [];
		let p6 = [];
		
		assert( equal(p1,p2)); 
		assert(!equal(p1,p3));
		assert(!equal(p3,p4));
		assert( equal(p5,p6));
		assert(!equal(p1,p6));
	});
});
