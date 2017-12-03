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
var { add } = FloPoly;

describe('add', function() {
	it('should add some polynomials correctly', 
	function() {
		let p1 = [3,4];
		let p2 = [1,2,3];
		let p3 = [3,2,1];
		expect(add(p1,p2)).to.eql([1,5,7]);
		expect(add(p2,p1)).to.eql([1,5,7]);
		expect(add(p3,p2)).to.eql([4,4,4]);
	});
});