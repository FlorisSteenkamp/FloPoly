
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bNegate } from '../../../src/index.js';


describe('bNegate', function() {
	it('should correctly negate some polynomials with bigint coefficients', 
	function() {
		let p1 = [1n, -2n];
		assert(bEqual(bNegate(p1), [-1n, 2n]));
	});
});