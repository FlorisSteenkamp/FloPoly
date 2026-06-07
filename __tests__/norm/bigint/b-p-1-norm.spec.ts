import { describe, expect, it } from '@jest/globals';

import { bP1Norm } from '../../../src/norm/bigint/b-p-1-norm.js';


describe('bP1Norm', function() {
	it('should correctly calculate the p-1 norm of some polynomials', 
	function() {
        let p0: bigint[] = [];
		let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bP1Norm(p0)).toEqual(0n);
		expect(bP1Norm(p1)).toEqual(23n);
		expect(bP1Norm(p2)).toEqual(25n);
	});
});