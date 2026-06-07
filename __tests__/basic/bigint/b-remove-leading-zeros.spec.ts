import { describe, expect, it } from '@jest/globals';

import { bRemoveLeadingZeros } from '../../../src/basic/bigint/b-remove-leading-zeros.js';


describe('bRemoveLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with bigint coefficients', 
	function() {
		let p1 = [0n, 10n, -5n];
		let p2 = [0n, 0n, -10n, 1n];
		let p3: bigint[] = [];
		let p4 = [0n,0n,0n,0n];
		
		expect(bRemoveLeadingZeros(p1)).toEqual([10n, -5n]); 
		expect(bRemoveLeadingZeros(p2)).toEqual([-10n, 1n]);
		expect(bRemoveLeadingZeros(p3)).toEqual([]);
		expect(bRemoveLeadingZeros(p4)).toEqual([]);
	});
});