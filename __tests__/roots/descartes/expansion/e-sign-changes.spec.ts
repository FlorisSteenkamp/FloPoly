import { describe, expect, it } from '@jest/globals';
import { eSignChanges } from '../../../../src/roots/sturm/expansion/e-sign-changes.js';
import { toCasStr } from '../../../../src/basic/to-cas-str.js';


describe('eSignChanges', function() {
    it('should correctly calculate the number of sign changes of some polynomials with Shewchuk expansion coefficients', 
    function() {
        let p1 = [[1],[2],[-3],[0],[0],[3],[-1]];
        let p2: number[][] = [];
        
        let r1 = eSignChanges(p1);
        expect(r1).toEqual(3);

        let r2 = eSignChanges(p2);
        expect(eSignChanges(p2)).toEqual(0);
    });

    it('should handle zero coefficients anywhere (including all-zero input)',
    function() {
        // Regression: all-zero input previously ran off the end of the array
        expect(eSignChanges([[0]])).toEqual(0);
        expect(eSignChanges([[0], [0], [0]])).toEqual(0);
        expect(eSignChanges([[0], [0], [1], [-1]])).toEqual(1);
        expect(eSignChanges([[1], [-1], [0], [0]])).toEqual(1);
        expect(eSignChanges([[0], [-1], [0], [1], [0]])).toEqual(1);
        expect(eSignChanges([[-1], [1], [-1], [1]])).toEqual(3);
        expect(eSignChanges([[5]])).toEqual(0);
    });

    it('should use the sign of the whole expansion, not of its lowest component',
    function() {
        // non-compressed expansions with a zero low component
        expect(eSignChanges([[0, 1], [0, -1]])).toEqual(1);
        expect(eSignChanges([[0, 1], [0, 0], [0, -1]])).toEqual(1);
        expect(eSignChanges([[0, 0], [0, 1], [0, 1]])).toEqual(0);
        // the sign is determined by the most significant (last) component
        expect(eSignChanges([[1, -(2**60)], [1]])).toEqual(1);
    });
});
