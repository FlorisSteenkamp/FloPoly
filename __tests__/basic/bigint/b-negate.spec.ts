import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bNegate } from '../../../src/basic/bigint/b-negate.js';


describe('bNegate', function() {
	it('should correctly negate some polynomials with bigint coefficients', 
	function() {
		let p1 = [1n, -2n];
		expect(bEqual(bNegate(p1), [-1n, 2n])).toBeTruthy();
	});
});