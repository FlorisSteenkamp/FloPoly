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
var { toCasStr } = FloPoly;

describe('toCasStr', function() {
	it('should correctly transform some polynomials into a human/CAS readable form', 
	function() {
		let p = [5,4,3,2,1];
		
		expect(toCasStr(p)).to.equal("x^4*5 + x^3*4 + x^2*3 + x*2 + 1"); 
	});
});