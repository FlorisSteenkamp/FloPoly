import { describe, expect, it } from '@jest/globals';

import { absCoeff } from '../../../src/basic/double/abs-coeff.js';


describe('absCoeff', function() {
    it('change all coeffients to their absolute values for some polynomials with double precision coefficients', 
    function() {
        let p1: number[] = [];
        let p2 = [-2,3];
        let p3 = [-3,-2,-1];
        expect(absCoeff(p1)).toEqual([]);
        expect(absCoeff(p2)).toEqual([2,3]);
        expect(absCoeff(p3)).toEqual([3,2,1]);
    });
});