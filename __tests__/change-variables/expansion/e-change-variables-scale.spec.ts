import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eChangeVariablesScale } from '../../../src/change-variables/expansion/e-change-variables-scale.js';


describe('eChangeVariablesScale', function() {
	it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1],[2],[7]];
		expect(eEqual(eChangeVariablesScale(p1, 3), [])).toBeTruthy();
		expect(eEqual(eChangeVariablesScale(p2, 3), [[9],[6],[7]])).toBeTruthy();
	});
});