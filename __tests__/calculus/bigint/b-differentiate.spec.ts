import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bDifferentiate } from '../../../src/calculus/bigint/b-differentiate.js';


describe('bDifferentiate', function() {
    it('should differentiate some polynomials with bigint coefficients correctly', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n];
        let p3 = [5n, 4n, 3n, 2n, 1n];
        expect(bEqual(bDifferentiate(p1), [])).toEqual(true);
        expect(bEqual(bDifferentiate(p2), [])).toEqual(true);
        expect(bEqual(bDifferentiate(p3), [20n, 12n, 6n, 2n])).toEqual(true);
    });
});