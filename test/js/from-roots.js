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
var { equal, fromRoots } = FloPoly;

describe('fromRoots', function() {
	it('should calculate some polynomials correctly from given roots', 
	function() {
		let p1 = [1,2,3,3];
		assert(equal(fromRoots(p1), [1, -9, 29, -39, 18]));
	});
});