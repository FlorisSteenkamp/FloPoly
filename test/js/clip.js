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
var { clip } = FloPoly;

describe('clip', function() {
	it('should clip some polynomials correctly when δ is not specified', 
	function() {
		let p1 = [1e-18, 1e-10, 1e-5];
		let p2 = [1e-18, 1e-10, 1e-1];
		
		expect(clip(p1)).to.eql([1e-18, 1e-10, 1e-5]); 
		expect(clip(p2)).to.eql([1e-10, 1e-1]);
	});
	
	
	it('should clip some polynomials correctly when δ is specified', 
	function() {
		let p1 = [1e-18, 1e-10, 1e-8];
		let p2 = [1e-18, 1e-10, 1e-1];
		let δ;
		
		δ = 1e-3;
		expect(clip(p1,δ)).to.eql([1e-10, 1e-8]); 
		expect(clip(p2,δ)).to.eql([1e-1]);
		
		let p3 = [1, 10, 10, 1e6, 1e6]; 
		δ = 1e-2;
		expect(clip(p3,δ)).to.eql([1e6, 1e6]);
		
		expect(clip([])).to.eql([]);
	});
});