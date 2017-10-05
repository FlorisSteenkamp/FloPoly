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
var { degree } = FloPoly;

describe('degree', function() {
	it('should report the correct degree for some polynomials', 
	function() {
		expect(degree([])).to.equal(-1);
		expect(degree([1])).to.equal(0);
		expect(degree([5,4,3,2,1])).to.equal(4);
	});
});