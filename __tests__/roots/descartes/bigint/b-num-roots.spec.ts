import { describe, expect, it } from '@jest/globals';
import { bNumRoots } from '../../../../src/roots/sturm/bigint/b-num-roots.js';


describe('bNumRoots', function() {
    it('should correctly calculate the number of roots of some polynomials',
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(BigInt);;
            expect(bNumRoots(p)).toEqual(4);
        }
    });

    it('should correctly calculate the number of roots when the Sturm chain has degree drops of 2 or more',
    function() {
        // Regression: a degree drop >= 2 in the chain made the subresultant
        // divisor `D` negative which flipped the sign of later chain entries
        {
            // x(9x^4 + 2x + 5) - only real root is x = 0
            const p = [9n, 0n, 0n, 2n, 5n, 0n];
            expect(bNumRoots(p)).toEqual(1);
        }
        {
            // x(10x^4 + 10x^3 + 4x^2 + 3x + 6) - only real root is x = 0
            const p = [10n, 10n, 4n, 3n, 6n, 0n];
            expect(bNumRoots(p)).toEqual(1);
        }
        {
            // x^4 - 1 - real roots are ±1
            const p = [1n, 0n, 0n, 0n, -1n];
            expect(bNumRoots(p)).toEqual(2);
        }
    });

    it('should handle constant, zero and leading-zero polynomials',
    function() {
        expect(bNumRoots([])).toEqual(Infinity);
        expect(bNumRoots([0n])).toEqual(Infinity);
        expect(bNumRoots([0n, 0n])).toEqual(Infinity);
        expect(bNumRoots([5n])).toEqual(0);
        expect(bNumRoots([0n, 1n, -2n])).toEqual(1);
        expect(bNumRoots([0n, 0n, 1n, -3n, 2n])).toEqual(2);
        expect(bNumRoots([1n, -2n, 1n])).toEqual(1);  // (x-1)^2
    });
});


