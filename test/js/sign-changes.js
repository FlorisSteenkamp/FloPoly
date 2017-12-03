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
var { signChanges } = FloPoly;

describe('signChanges', function() {
	it('should correctly calculate the number of sign changes of some polynomials', 
	function() {
		let p = [1,2,-3,0,0,3,-1];
		
		expect(signChanges(p)).to.equal(3);
	});
});