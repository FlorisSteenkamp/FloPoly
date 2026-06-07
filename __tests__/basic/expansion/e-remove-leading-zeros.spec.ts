import { describe, expect, it } from '@jest/globals';

import { eRemoveLeadingZeros } from '../../../src/basic/expansion/e-remove-leading-zeros.js';


describe('eRemoveLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1 = [[0], [1e-10], [1e-5]];
		let p2 = [[0], [0], [1e-10], [1e-1]];
		let p3: number[][] = [];
		let p4 = [[0],[0],[0],[0]];
		
		expect(eRemoveLeadingZeros(p1)).toEqual([[1e-10], [1e-5]]); 
		expect(eRemoveLeadingZeros(p2)).toEqual([[1e-10], [1e-1]]);
		expect(eRemoveLeadingZeros(p3)).toEqual([]);
		expect(eRemoveLeadingZeros(p4)).toEqual([]);
	});
});