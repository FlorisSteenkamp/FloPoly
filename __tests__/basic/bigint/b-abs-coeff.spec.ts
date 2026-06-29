import { describe, expect, it } from '@jest/globals';
import { bAbsCoeff } from '../../../src/basic/bigint/b-abs-coeff.js';


describe('bAbsCoeff', function() {
    it('change all coeffients to their absolute values for some polynomials with bigint coefficients', 
    function() {
        let p1: bigint[] = [];
        let p2 = [-2n,3n];
        let p3 = [-3n,-2n,-1n];
        expect(bAbsCoeff(p1)).toEqual([]);
        expect(bAbsCoeff(p2)).toEqual([2n,3n]);
        expect(bAbsCoeff(p3)).toEqual([3n,2n,1n]);
    });
});