import { describe, expect, it } from '@jest/globals';

import { eP1Norm } from '../../../src/norm/expansion/e-p-1-norm.js';


describe('eP1Norm', function() {
    it('should correctly calculate the p-1 norm of some polynomials', 
    function() {
        let p0: number[][] = [];
        let p1 = [[1e-10],[-1e-12],[1]];
        let p2 = [[-1e-3],[1e-12],[1e-10]];
        let p3 = [[-1e-3],[1e-1],[1e-10]];
        expect(eP1Norm(p0)).toEqual(0);
        expect(eP1Norm(p1)).toEqual(1e-10 + 1e-12 + 1);
        expect(eP1Norm(p2)).toEqual(1e-3 + 1e-12 + 1e-10);
        expect(eP1Norm(p3)).toEqual(1e-3 + 1e-1 + 1e-10);
    });
});