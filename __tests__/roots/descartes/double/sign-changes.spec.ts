import { describe, expect, it } from '@jest/globals';
import { signChanges } from '../../../../src/roots/sturm/double/sign-changes.js';


describe('signChanges', function() {
    it('should correctly calculate the number of sign changes of some polynomials with double precision coefficients', 
    function() {
        let p1 = [1,2,-3,0,0,3,-1];
        let p2: number[] = [];
        
        expect(signChanges(p1)).toEqual(3);
        expect(signChanges(p2)).toEqual(0);
    });

    it('should handle zero coefficients anywhere (including all-zero input)',
    function() {
        expect(signChanges([0])).toEqual(0);
        expect(signChanges([0, 0, 0])).toEqual(0);
        expect(signChanges([0, 0, 1, -1])).toEqual(1);
        expect(signChanges([1, -1, 0, 0])).toEqual(1);
        expect(signChanges([0, -1, 0, 1, 0])).toEqual(1);
        expect(signChanges([-1, 1, -1, 1])).toEqual(3);
        expect(signChanges([5])).toEqual(0);
    });
});