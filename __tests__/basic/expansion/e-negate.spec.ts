import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eNegate } from '../../../src/basic/expansion/e-negate.js';


describe('eNegate', function() {
	it('should correctly negate some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1 = [[0.1], [-0.2]];
		expect(eEqual(eNegate(p1), [[-0.1], [0.2]])).toBeTruthy();
	});
});