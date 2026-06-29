import { describe, expect, it } from '@jest/globals';

import { bHorner } from '../../../src/evaluate/bigint/b-horner.js';


describe('bHorner', function() {
    it('should evaluate some polynomials (with bigint coefficients) correctly at some bigint values', 
    function() {
        // 5*x^4 - 4*x^3 + 3*x^2 - 2*x + 1
        let p1 = [5n,-4n,3n,-2n,1n];
        let p2: bigint[] = [];
        
        expect(bHorner(p1,3n) === 319n).toEqual(true);
        expect(bHorner(p1,-3n) === 547n).toEqual(true);
        expect(bHorner(p2,2n) === 0n).toEqual(true);
        expect(bHorner(p1,-20n) === 833241n).toEqual(true);
    });
});