import { describe, expect, it } from '@jest/globals';

import { bP2NormSquared } from '../../../src/norm/bigint/b-p-2-norm-squared.js';


describe('bP2NormSquared', function() {
    it('should correctly calculate the p-2 (Euclidean) norm squared of some polynomials', 
    function() {
        let p0: bigint[] = [];
        let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bP2NormSquared(p0)).toEqual(0n);
        expect(bP2NormSquared(p1)).toEqual(245n);
        expect(bP2NormSquared(p2)).toEqual(253n);
    });
});