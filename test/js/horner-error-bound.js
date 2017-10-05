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
var { hornerErrorBound } = FloPoly;

describe('hornerErrorBound', function() {
	it('should correctly find error bound for some polynomials at some point', 
	function() {
		let p1 = [1.1,2.2,-3.3];
		expect(hornerErrorBound(p1, 1.5)).to.equal(5.1292303737682235e-15);
	});
});
