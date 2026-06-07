import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eIsUnit } from '../../../src/basic/expansion/e-is-unit.js';


describe('eIsUnit', function() {
	it('should correctly report some polynomials as being the unit polynomial', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[4],[3],[2],[1]];
		expect(!eIsUnit(p1)).toBeTruthy();
		expect(eIsUnit(p2)).toBeTruthy();
		expect(!eIsUnit(p3)).toBeTruthy();
	});
});