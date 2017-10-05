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
var { equal, reflectAboutYAxis } = FloPoly;

describe('reflectAboutYAxis', function() {
	it('should correctly reflect some polynomials about the y axis', 
	function() {
		let p = [5,4,3,2,1];

		assert(equal(reflectAboutYAxis(p), [5,-4,3,-2,1]));
	});
});