import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { changeVariablesLinear } from '../../../src/change-variables/double/change-variables-linear.js';


describe('changeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [1,2,7];
		expect(equal(changeVariablesLinear(p1, 3, 4), [])).toBeTruthy();
		expect(equal(changeVariablesLinear(p2, 3, 4), [9,30,31])).toBeTruthy();
	});
});