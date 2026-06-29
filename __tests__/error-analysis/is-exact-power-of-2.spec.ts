import { describe, expect, it } from '@jest/globals';
import { isExactPowerOf2 } from '../../src/error-analysis/is-exact-power-of-2.js';


describe('isExactPowerOf2', function() {
    it('should return the correct result for edge cases', function() {
        const edgeCases: [number,boolean][] = [
            [2**-1074, true],
            [2**-1073, true],
            [1.5e-323, false],
            [3e-323, false],
            [2**1000, true],
            [1.0715086071862676e+301, false],
            [9.33263618503219e-302, false],
            [9.332636185032189e-302, true],
            [1.1125369292536007e-308, true],
            [1e-323, true],
            [5e-324, true],
            [2.781342323134e-309, true],
            [4.172013484701003e-309, false],
            [2.781342328314656e-309, false]
        ];

        for (let [v, r] of edgeCases) {
            expect(isExactPowerOf2(v)).toBe(r);
        }
    });

    it('should return true for exact positive powers of two', function() {
        expect(isExactPowerOf2(1)).toBe(true);
        expect(isExactPowerOf2(2)).toBe(true);
        expect(isExactPowerOf2(4)).toBe(true);
        expect(isExactPowerOf2(8)).toBe(true);
        expect(isExactPowerOf2(1024)).toBe(true);
    });

    it('should return true for exact fractional powers of two', function() {
        expect(isExactPowerOf2(0.5)).toBe(true);
        expect(isExactPowerOf2(0.25)).toBe(true);
        expect(isExactPowerOf2(0.125)).toBe(true);
        expect(isExactPowerOf2(2 ** -20)).toBe(true);
    });

    it('should return false for non-powers of two', function() {
        expect(isExactPowerOf2(3)).toBe(false);
        expect(isExactPowerOf2(6)).toBe(false);
        expect(isExactPowerOf2(10)).toBe(false);
        expect(isExactPowerOf2(0.3)).toBe(false);
        expect(isExactPowerOf2(-3)).toBe(false);
    });

    it('should return false for zero and non-finite numbers', function() {
        expect(isExactPowerOf2(0)).toBe(false);
        expect(isExactPowerOf2(-0)).toBe(false);
        expect(isExactPowerOf2(Number.POSITIVE_INFINITY)).toBe(false);
        expect(isExactPowerOf2(Number.NEGATIVE_INFINITY)).toBe(false);
        expect(isExactPowerOf2(Number.NaN)).toBe(false);
    });
});
