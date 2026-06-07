import { describe, expect, it } from '@jest/globals';

import { eDegree } from '../../../src/basic/expansion/e-degree.js';


describe('eDegree', function() {
	it('should report the correct degree for some polynomials with Shewchuk expansion coefficients', 
	function() {
		expect(eDegree([])).toEqual(-1);
		expect(eDegree([[1]])).toEqual(0);
		expect(eDegree([[5],[4],[3],[2],[1]])).toEqual(4);
		expect(eDegree([[5],[0],[0],[0],[0]])).toEqual(4);
	});
});