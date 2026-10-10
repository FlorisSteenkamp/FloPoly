import { describe, expect, it } from '@jest/globals';

import { divideByConst } from '../../../src/basic/double/divide-by-const.js';


describe('divideByConst', function() {
    it('should correctly divide some polynomials with double precision coefficients by a constant', 
    function() {
        let p1: number[] = [];
        let p2 = [1.1,2.2,3.3,4.4];
        let inf = Infinity;
        expect(divideByConst(p1,2)).toEqual([]);
        expect(divideByConst(p2,2)).toEqual([0.55,1.1,1.65,2.2]);
        expect(divideByConst(p2,0)).toEqual([inf,inf,inf,inf]);
    });

    it('should remove leading zeros caused by underflow', function() {
        expect(divideByConst([1e-300, 1], 1e300)).toEqual([1e-300]);
        expect(divideByConst([1e-300, 1e-300], 1e300)).toEqual([]);
    });
});