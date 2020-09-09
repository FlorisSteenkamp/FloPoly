
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eDifferentiate } from '../../../src/index';


describe('eDifferentiate', function() {
	it('should differentiate some polynomials with Shewchuk expansion coefficients correctly', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[5], [4], [3], [2], [1]];
		assert(eEqual(eDifferentiate(p1), []));
		assert(eEqual(eDifferentiate(p2), []));
		assert(eEqual(eDifferentiate(p3), [[20], [12], [6], [2]]));
	});
});