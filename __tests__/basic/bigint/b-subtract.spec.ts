import { describe, expect, it } from '@jest/globals';

import { bSubtract } from '../../../src/basic/bigint/b-subtract.js';


describe('bSubtract', function() {
	it('should correctly subtract some polynomials with bigint coefficients from each other', 
	function() {
		let p1 = [   2n,3n];
		let p2 = [4n,4n,4n];
		let p3 = [2n,1n,2n];
		let p4: bigint[] = [];
			
		expect(bSubtract(p1,p2)).toEqual([-4n,-2n,-1n]);
		expect(bSubtract(p2,p1)).toEqual([4n,2n,1n]);
		expect(bSubtract(p2,p3)).toEqual([2n,3n,2n]);
		expect(bSubtract(p2,p4)).toEqual([4n,4n,4n]);
		expect(bSubtract(p4,p2)).toEqual([-4n,-4n,-4n]);
	});
});