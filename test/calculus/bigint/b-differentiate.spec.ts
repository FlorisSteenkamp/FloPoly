
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bDifferentiate } from '../../../src/index';


describe('bDifferentiate', function() {
	it('should differentiate some polynomials with bigint coefficients correctly', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
		let p3 = [5n, 4n, 3n, 2n, 1n];
		assert(bEqual(bDifferentiate(p1), []));
		assert(bEqual(bDifferentiate(p2), []));
		assert(bEqual(bDifferentiate(p3), [20n, 12n, 6n, 2n]));
	});
});