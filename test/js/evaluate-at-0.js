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
var { evaluateAt0, evaluate } = FloPoly;

describe('evaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [0.1,0.2,0.3,2,3,5,11.11];
		let p2 = [0.1,0.2,0.3,2,3,5,0];
		
		expect(evaluateAt0(p1)).to.equal(11.11);
		expect(evaluateAt0(p2)).to.equal(0);
		expect(evaluateAt0(p1)).to.equal(evaluate(p1,0));
		expect(evaluateAt0(p2)).to.equal(evaluate(p2,0));
	});
});