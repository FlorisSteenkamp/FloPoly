import { describe, expect, it } from '@jest/globals';

import { signChanges } from '../../../../src/roots/descartes/double/sign-changes.js';


describe('signChanges', function() {
    it('should correctly calculate the number of sign changes of some polynomials with double precision coefficients', 
    function() {
        let p1 = [1,2,-3,0,0,3,-1];
        let p2: number[] = [];
        
        expect(signChanges(p1)).toEqual(3);
        expect(signChanges(p2)).toEqual(0);
    });
});