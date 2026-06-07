import { describe, expect, it } from '@jest/globals';

import { degree } from '../../../src/basic/double/degree.js';


describe('degree', function() {
	it('should report the correct degree for some polynomials with double precision coefficients', 
	function() {
		expect(degree([])).toEqual(-1);
		expect(degree([1])).toEqual(0);
		expect(degree([5,4,3,2,1])).toEqual(4);
		expect(degree([5,0,0,0,0])).toEqual(4);
	});
});