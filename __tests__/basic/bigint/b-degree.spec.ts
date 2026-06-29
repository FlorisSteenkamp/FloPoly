import { describe, expect, it } from '@jest/globals';
import { bDegree } from '../../../src/basic/bigint/b-degree.js';


describe('degree', function() {
    it('should report the correct degree for some polynomials with bigint coefficients', 
    function() {
        expect(bDegree([])).toEqual(-1);
        expect(bDegree([1n])).toEqual(0);
        expect(bDegree([5n,4n,3n,2n,1n])).toEqual(4);
        expect(bDegree([5n,0n,0n,0n,0n])).toEqual(4);
    });
});