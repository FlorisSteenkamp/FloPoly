'use strict'

var mocha;
var chai;
var helper;
var FloPoly;

if (typeof require === 'undefined') {
	// Browser
} else {
	// Node
	mocha   = require('mocha');
	chai    = require('chai');
	helper  = require('./helpers/helper.js');
	FloPoly = require('../../js/flo-poly.js');
}

var { assert, expect } = chai;
var { rootAccurateEnough } = helper;
var { brent, evaluate, fromRoots } = FloPoly;

describe('brent', function() {
	it('should find the root in the interval correctly for some polynomials / intervals', 
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
		let f = evaluate(p);
		assert(
				rootAccurateEnough(p, brent(f,2.2,3.8)), 
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p, brent(f,2.2,3.1)),
				'Root not found accurately enough'
		);
		
		// Funny intervals
		assert(
				rootAccurateEnough(p, brent(f,4,4)),
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p, brent(f,3.1,2.2)),
				'Root not found accurately enough'
		);
		
		// Roots at endpoints of intervals
		assert(
				rootAccurateEnough(p, brent(f,2,2.5)),
				'Root not found accurately enough'
		);
		assert(
				rootAccurateEnough(p, brent(f,2.5,3)),
				'Root not found accurately enough'
		);
	});
	
	it('should throw a relevant exception if the root is not bracketed',
	function() {
		let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
		let f = evaluate(p);
		expect(() => brent(f,2.2,2.3)).to.throw(Error, 'Root not bracketed');		
	});
});
