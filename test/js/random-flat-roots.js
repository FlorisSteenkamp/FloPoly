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
var { flatRoots } = FloPoly.random;

describe('random.flatRoots', function() {
	it('should predictably generate a polynomial with Roots in a flat random distribution', 
	function() {
		let res;
		
		res = flatRoots(3,0,10); 
		assert(equal(res.p, [1, -17.27247918024659, 97.33487287168995, -179.34094494147305]));
		expect(res.seed).to.equal(939629312);
		
		res = flatRoots(3,0,10); 
		assert(equal(res.p, [1, -17.27247918024659, 97.33487287168995, -179.34094494147305]));
		expect(res.seed).to.equal(939629312);
		
		res = flatRoots(3); // Uses defaults for range
		assert(equal(res.p, [1, -1.7272479180246592, 0.9733487287168996, -0.17934094494147307]));
		expect(res.seed).to.equal(939629312);
	});
});