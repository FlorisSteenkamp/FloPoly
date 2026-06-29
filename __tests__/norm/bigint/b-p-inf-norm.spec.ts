import { describe, expect, it } from '@jest/globals';

import { bPInfNorm } from '../../../src/norm/bigint/b-p-inf-norm.js';


describe('bPInfNorm', function() {
    it('should correctly calculate the infinity norm of some polynomials', 
    function() {
        let p0: bigint[] = [];
        let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bPInfNorm(p0)).toEqual(0n);
        expect(bPInfNorm(p1)).toEqual(12n);
        expect(bPInfNorm(p2)).toEqual(12n);
    });
});