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
var { equal, quadraticRoots } = FloPoly;

describe('quadraticRoots', function() {
	it('should correctly calculate the quadratic roots of some 2nd order polynomials', 
	function() {
		assert(equal(quadraticRoots([1, -3, 2]), [1,2])); 
		assert(equal(quadraticRoots([1, 0, -1]), [-1,1]));
		assert(equal(quadraticRoots([1, 6, 8]), [-4,-2]));
		assert(equal(quadraticRoots([1, 0, 0]), [0]));
		assert(equal(quadraticRoots([1,-20,100]), [10]));
		assert(equal(quadraticRoots([1,-20,101]), []));
	});
});