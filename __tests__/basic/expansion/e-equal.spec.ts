import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';


describe('eEqual', function() {
    it('should check some polynomials with Shewchuk expansion coefficients are correctly given as equal or not', 
    function() {
        let p1 = [[1e10], [1e5]];
        let p2 = [[1e10], [1e5]];
        let p3 = [[1e10], [1e6]];
        let p4 = [[1], [1e10], [1e6]];
        let p5: number[][] = [];
        let p6: number[][] = [];
        
        expect(eEqual(p1,p2)).toEqual(true); 
        expect(!eEqual(p1,p3)).toEqual(true);
        expect(!eEqual(p3,p4)).toEqual(true);
        expect(eEqual(p5,p6)).toEqual(true);
        expect(!eEqual(p1,p6)).toEqual(true);
    });
});
