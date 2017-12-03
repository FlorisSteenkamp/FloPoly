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
var { multiplyByConst } = FloPoly;

describe('multiplyByConst', function() {
	it('should correctly multiply some polynomials by a constant', 
	function() {
		let p1 = [1.1,2.2,3.3,4.4];
		expect(multiplyByConst(2,p1)).to.eql([2.2,4.4,6.6,8.8]);
	});
	
	
	it('should return the zero polynomial if the polynomial was multiplied by 0', 
	function() {
		let p1 = [1.1,2.2,3.3,4.4];
		expect(multiplyByConst(0,p1)).to.eql([]);
	});
});