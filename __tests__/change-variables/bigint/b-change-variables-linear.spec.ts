import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bChangeVariablesLinear } from '../../../src/change-variables/bigint/b-change-variables-linear.js';


describe('bChangeVariablesLinear', function() {
	it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,7n];
		expect(bEqual(bChangeVariablesLinear(p1, 3n, 4n), [])).toBeTruthy();
		expect(bEqual(bChangeVariablesLinear(p2, 3n, 4n), [9n,30n,31n])).toBeTruthy();
	});
});