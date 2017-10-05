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
var { equal, sturmChain } = FloPoly;

describe('sturmChain', function() {
	it('should correctly calculate the Sturm Chain for some polynomials', 
	function() {
		let p = [-3,4,2,-2];
		let chain = sturmChain(p); 
		assert(equal(chain[0],[-3, 4, 2, -2]));
		assert(equal(chain[1],[-9, 8, 2]));
		assert(equal(chain[2],[-2.5185185185185186, 1.7037037037037037]));
		assert(equal(chain[3],[-3.2932525951557086]));
	});
});