
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, invert } from '../../../src/index.js';


describe('invert', function() {
	it('should correctly invert some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
		let p3 = [4,3,2,1];
		assert(equal(invert(p1), []));
		assert(equal(invert(p2), [1]));
		assert(equal(invert(p3), [1,2,3,4]));
	});
});