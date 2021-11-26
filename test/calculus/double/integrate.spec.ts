import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, integrate } from '../../../src/index.js';


describe('integrate', function() {
	it('should integrate some polynomials with double precision coefficients correctly', 
	function() {
		let p1: number[] = [];
		let p3 = [3, 2, 1];
		assert(equal(integrate(p1, 99), [99]));
		assert(equal(integrate(p3, 99), [1, 1, 1, 99]));
	});
});
