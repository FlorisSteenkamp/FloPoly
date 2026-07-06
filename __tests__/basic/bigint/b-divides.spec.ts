import { describe, expect, it } from '@jest/globals';
import { bDivides } from '../../../src/basic/bigint/b-divides.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';


describe('bDivides', function() {
    it('should handle empty-polynomial edge cases', function() {
        // Empty divides empty only.
        expect(bDivides([], [])).toEqual(true);
        expect(bDivides([], [1n])).toEqual(false);

        // Non-empty cannot divide empty.
        expect(bDivides([1n], [])).toEqual(false);
    });

    it('should return true for exact bigint polynomial divisibility', function() {
        const b = [2n, -1n, 3n];
        const q = [5n, 0n, -2n];
        const a = bMultiply(b, q);

        expect(bDivides(b, a)).toEqual(true);
    });

    it('should return false when remainder is non-zero', function() {
        const b = [1n, 1n];
        const a = [1n, 0n, 2n];

        expect(bDivides(b, a)).toEqual(false);
    });

    it('should return false when divisor degree exceeds dividend degree', function() {
        const b = [1n, 2n, 3n];
        const a = [4n, 5n];

        expect(bDivides(b, a)).toEqual(false);
    });

    it('should enforce exact integer quotient via pseudo-division multiplier', function() {
        // Over Q this would divide (1 / 2), but over Z[x] it should be false.
        expect(bDivides([2n], [1n])).toEqual(false);

        // Same divisor with integer quotient should be true.
        expect(bDivides([2n], [6n, 4n, -2n])).toEqual(true);
    });
});
