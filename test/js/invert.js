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
var { equal, invert } = FloPoly;

describe('invert', function() {
	it('should correctly invert some polynomials', 
	function() {
		let p = [4,3,2,1];
		assert(equal(invert(p), [1,2,3,4]));
	});
});