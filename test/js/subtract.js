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
var { equal, subtract } = FloPoly;

describe('subtract', function() {
	it('should correctly subtract some polynomials from each other', 
	function() {
		let p1 = [  2,3];
		let p2 = [4,4,4];
		let p3 = [2,1,2];
			
		expect(subtract(p1,p2)).to.eql([-4, -2, -1]);
		expect(subtract(p2,p1)).to.eql([4, 2, 1]);
		expect(subtract(p2,p3)).to.eql([2, 3, 2]);
	});
});