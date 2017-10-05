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
var { negativeRootLowerBound_LMQ } = FloPoly;

describe('negativeRootLowerBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		expect(negativeRootLowerBound_LMQ(p1)).to.equal(-4.015534272870436);
	});
});