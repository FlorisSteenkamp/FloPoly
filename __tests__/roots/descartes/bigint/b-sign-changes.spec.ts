import { describe, expect, it } from '@jest/globals';
import { bSignChanges } from '../../../../src/roots/sturm/bigint/b-sign-changes.js';


describe('bSignChanges', function() {
    it('should correctly calculate the number of sign changes of some polynomials with bigint coefficients', 
    function() {
        {
            const p1 = [1n,2n,-3n,0n,0n,3n,-1n];
            const p2: bigint[] = [];
            
            expect(bSignChanges(p1)).toEqual(3);
            expect(bSignChanges(p2)).toEqual(0);
        }
        {
            const p = [0n, 5355n, 941937131520n, 1646661936831528960n, 14680245548163583180800n];
            expect(bSignChanges(p)).toEqual(0);
        }
    });
});