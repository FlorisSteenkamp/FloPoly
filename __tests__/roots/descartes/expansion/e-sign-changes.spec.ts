import { describe, expect, it } from '@jest/globals';

import { eSignChanges } from '../../../../src/roots/descartes/expansion/e-sign-changes.js';
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
});
