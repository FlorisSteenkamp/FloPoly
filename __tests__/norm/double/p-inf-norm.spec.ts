import { describe, expect, it } from '@jest/globals';

import { pInfNorm } from '../../../src/norm/double/p-inf-norm.js';


describe('pInfNorm', function() {
    it('should correctly calculate the infinity norm of some polynomials', 
    function() {
        let p0: number[] = [];
        let p1 = [1e-10,-1e-12,1];
        let p2 = [-1e-3,1e-12,1e-10];
        let p3 = [-1e-3,1e-1,1e-10];
        expect(pInfNorm(p0)).toEqual(0);
        expect(pInfNorm(p1)).toEqual(1);
        expect(pInfNorm(p2)).toEqual(1e-3);
        expect(pInfNorm(p3)).toEqual(1e-1);
    });
});