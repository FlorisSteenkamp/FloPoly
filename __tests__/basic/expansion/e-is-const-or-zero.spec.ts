import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eIsConstOrZero } from '../../../src/basic/expansion/e-is-const-or-zero.js';


describe('eIsConstOrZero', function() {
	it('should correctly report some polynomials as being a constant or the zero polynomial', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[0.000000000000000000001, 3]];
		let p4 = [[4],[3],[2],[1]];
		expect(eIsConstOrZero(p1)).toBeTruthy();
		expect(eIsConstOrZero(p2)).toBeTruthy();
		expect(eIsConstOrZero(p3)).toBeTruthy();
		expect(!eIsConstOrZero(p4)).toBeTruthy();
	});
});