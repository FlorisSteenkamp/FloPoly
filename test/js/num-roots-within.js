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
var { numRootsWithin } = FloPoly;

describe('numRootsWithin', function() {
	it('should correctly calculate the number of roots within an interval for some polynomials', 
	function() {
		let p = [1, 1, -64, 236, -240];
		expect(numRootsWithin(p,-20,-11)).to.equal(0);
		expect(numRootsWithin(p,-11,-9)).to.equal(1);    
		expect(numRootsWithin(p,-11,3.5)).to.equal(3); 
		expect(numRootsWithin(p,-11,5)).to.equal(4);   
	});
});
