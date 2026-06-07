import { describe, expect, it } from '@jest/globals';

import { bSignChanges } from '../../../../src/roots/descartes/bigint/b-sign-changes.js';


describe('bSignChanges', function() {
	it('should correctly calculate the number of sign changes of some polynomials with bigint coefficients', 
	function() {
		let p1 = [1n,2n,-3n,0n,0n,3n,-1n];
		let p2: bigint[] = [];
		
		expect(bSignChanges(p1)).toEqual(3);
		expect(bSignChanges(p2)).toEqual(0);
	});
});