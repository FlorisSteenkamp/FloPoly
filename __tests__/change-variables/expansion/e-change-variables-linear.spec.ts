import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eChangeVariablesLinear } from '../../../src/change-variables/expansion/e-change-variables-linear.js';


describe('eChangeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1],[2],[7]];
		expect(eEqual(eChangeVariablesLinear(p1, 3, 4), [])).toBeTruthy();
		expect(eEqual(eChangeVariablesLinear(p2, 3, 4), [[9],[30],[31]])).toBeTruthy();
	});
});