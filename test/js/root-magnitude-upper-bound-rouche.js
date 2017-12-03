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
var { rootMagnitudeUpperBound_rouche } = FloPoly;

describe('rootMagnitudeUpperBound_rouche', function() {
	it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
	function() {
		let p = [2,-3,6,5,-130];

		expect(rootMagnitudeUpperBound_rouche(p)).to.equal(66);
	});
});