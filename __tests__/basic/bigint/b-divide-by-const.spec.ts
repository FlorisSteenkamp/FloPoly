import { describe, expect, it } from '@jest/globals';
import { bDivideByConst } from '../../../src/basic/bigint/b-divide-by-const.js';


describe('bDivideByConst', function() {
    it('should correctly divide (integer division) some polynomials with bigint coefficients by a constant', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n,2n,3n,4n];
        expect(bDivideByConst(p1,2n)).toEqual([]);
        expect(bDivideByConst(p2,2n)).toEqual([0n,1n,1n,2n]);
    });
});