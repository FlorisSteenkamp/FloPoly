import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { invert } from '../../../src/basic/double/invert.js';


describe('invert', function() {
	it('should correctly invert some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1];
		let p3 = [4,3,2,1];
		expect(equal(invert(p1), [])).toBeTruthy();
		expect(equal(invert(p2), [1])).toBeTruthy();
		expect(equal(invert(p3), [1,2,3,4])).toBeTruthy();
	});
});