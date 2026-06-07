import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { differentiate } from '../../../src/calculus/double/differentiate.js';


describe('differentiate', function() {
	it('should differentiate some polynomials with double precision coefficients correctly', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
		let p3 = [5, 4, 3, 2, 1];
		expect(equal(differentiate(p1), [])).toBeTruthy();
		expect(equal(differentiate(p2), [])).toBeTruthy();
		expect(equal(differentiate(p3), [20, 12, 6, 2])).toBeTruthy();
	});
});