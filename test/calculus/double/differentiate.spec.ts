
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, differentiate } from '../../../src/index';


describe('differentiate', function() {
	it('should differentiate some polynomials with double precision coefficients correctly', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
		let p3 = [5, 4, 3, 2, 1];
		assert(equal(differentiate(p1), []));
		assert(equal(differentiate(p2), []));
		assert(equal(differentiate(p3), [20, 12, 6, 2]));
	});
});