import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { integrate } from '../../../src/calculus/double/integrate.js';


describe('integrate', function() {
	it('should integrate some polynomials with double precision coefficients correctly', 
	function() {
		let p1: number[] = [];
		let p3 = [3, 2, 1];
		expect(equal(integrate(p1, 99), [99])).toBeTruthy();
		expect(equal(integrate(p3, 99), [1, 1, 1, 99])).toBeTruthy();
	});
});
