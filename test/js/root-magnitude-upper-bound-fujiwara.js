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
var { rootMagnitudeUpperBound_fujiwara } = FloPoly;

describe('rootMagnitudeUpperBound_fujiwara', function() {
	it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
	function() {
		let p = [2,-3,6,5,-130];

		expect(rootMagnitudeUpperBound_fujiwara(p)).to.equal(6.753296750770361);
	});
});