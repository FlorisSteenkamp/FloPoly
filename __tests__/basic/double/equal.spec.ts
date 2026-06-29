import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';


describe('equal', function() {
    it('should check some polynomials with double precision coefficients are correctly given as equal or not', 
    function() {
        let p1 = [1e10, 1e5];
        let p2 = [1e10, 1e5];
        let p3 = [1e10, 1e6];
        let p4 = [1, 1e10, 1e6];
        let p5: number[] = [];
        let p6: number[] = [];
        
        expect(equal(p1,p2)).toEqual(true); 
        expect(!equal(p1,p3)).toEqual(true);
        expect(!equal(p3,p4)).toEqual(true);
        expect(equal(p5,p6)).toEqual(true);
        expect(!equal(p1,p6)).toEqual(true);
    });
});
