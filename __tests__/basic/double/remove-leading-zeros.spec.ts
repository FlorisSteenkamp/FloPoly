import { describe, expect, it } from '@jest/globals';

import { removeLeadingZeros } from '../../../src/basic/double/remove-leading-zeros.js';


describe('removeLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with double precision coefficients', 
	function() {
		let p1 = [0, 1e-10, 1e-5];
		let p2 = [0, 0, 1e-10, 1e-1];
		let p3: number[] = [];
		let p4 = [0,0,0,0];
		
		expect(removeLeadingZeros(p1)).toEqual([1e-10, 1e-5]); 
		expect(removeLeadingZeros(p2)).toEqual([1e-10, 1e-1]);
		expect(removeLeadingZeros(p3)).toEqual([]);
		expect(removeLeadingZeros(p4)).toEqual([]);
	});
});