import { describe, expect, it } from '@jest/globals';

import { eAbsCoeff } from '../../../src/basic/expansion/e-abs-coeff.js';


describe('eAbsCoeff', function() {
    it('change all coeffients to their absolute values for some polynomials with Shewchuk expansion coefficients', 
    function() {
        let p1: number[][] = [];
        let p2 = [[-2],[3]];
        let p3 = [[-3],[-2],[-1]];
        expect(eAbsCoeff(p1)).toEqual([]);
        expect(eAbsCoeff(p2)).toEqual([[2],[3]]);
        expect(eAbsCoeff(p3)).toEqual([[3],[2],[1]]);
    });
});