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
var { changeVariables } = FloPoly;

describe('changeVariables', function() {
	it('should return the correct results for some input parameters', 
	function() {
		let res = changeVariables([1,2,7], 3, 4); //=> [9, 30, 31]
		assert.equal(res[0], 9);
		assert.equal(res[1], 30);
		assert.equal(res[2], 31);
	});
});