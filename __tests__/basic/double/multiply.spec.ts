import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { multiply, multiplyKaratsuba } from '../../../src/basic/double/multiply.js';


describe('multiply', function() {
    it('should correctly multiply some polynomials with double precision coefficients',
    function() {
        let p1 = [2];
        let p2: number[] = [];
        let p3 = [1,2,3];
        let p4 = [4,4,5,6,7];
        expect(equal(multiply(p1,p3), [2,4,6])).toEqual(true);
        expect(equal(multiply(p2,p3), [])).toEqual(true);
        expect(equal(multiply(p3,p4), [4, 12, 25, 28, 34, 32, 21])).toEqual(true);
    });
});


describe('multiplyKaratsuba', function() {
    it('should correctly multiply some small polynomials', function() {
        const p1 = [2];
        const p2: number[] = [];
        const p3 = [1, 2, 3];
        const p4 = [4, 4, 5, 6, 7];

        expect(equal(multiplyKaratsuba(p1, p3), [2, 4, 6])).toEqual(true);
        expect(equal(multiplyKaratsuba(p2, p3), [])).toEqual(true);
        expect(equal(multiplyKaratsuba(p3, p4), [4, 12, 25, 28, 34, 32, 21])).toEqual(true);
    });

    it('should agree with schoolbook multiplication for a recursion-sized input', function() {
        // length > 9 to force the recursive karatsuba path
        const p1 = [3, -1, 4, 1, 5, -9, 2, 6, 5, 3, 5];
        const p2 = [8, 9, 7, -9, 3, 2, 3, 8, 4, 6, 2, 6, 4];

        expect(equal(multiplyKaratsuba(p1, p2), multiply(p1, p2))).toEqual(true);
    });

    it('should work for unequal input lengths', function() {
        const p1 = [1, -3, 2, 0, 5, -1, 4, 2, 1, -7, 3, 6];
        const p2 = [2, 0, -5, 1, 9, -3, 4, 8, -2, 1];

        expect(equal(multiplyKaratsuba(p1, p2), multiply(p1, p2))).toEqual(true);
    });
});