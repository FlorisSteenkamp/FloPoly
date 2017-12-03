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
var { equal } = FloPoly;
var { flatCoefficients } = FloPoly.random;

describe('random.flatCoefficients', function() {
	it('should predictably generate a polynomial with coefficients in a flat random distribution', 
	function() {
		let res;
		
		res = flatCoefficients(3,-5,5); 
		assert(equal(res.p, [0.437291506677866, -0.5087333917617798, 2.3439210653305054]));
		expect(res.seed).to.equal(939629312);
		
		res = flatCoefficients(3,-5,5); 
		assert(equal(res.p, [0.437291506677866, -0.5087333917617798, 2.3439210653305054]));
		expect(res.seed).to.equal(939629312);
		
		res = flatCoefficients(3); // Uses default range 
		assert(equal(res.p, [0.0874583013355732, -0.10174667835235596, 0.4687842130661011]));
		expect(res.seed).to.equal(939629312);
	});
});