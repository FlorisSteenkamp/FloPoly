import { describe, expect, it } from '@jest/globals';
import { CompHornerK } from '../../../src/evaluate/double/comp-horner-k.js';
import { conditionNumber } from '../../../src/error-analysis/condition-number.js';


describe('CompHornerK', function() {
    it('should handle constant, zero and low degree polynomials', function() {
        // Regression: previously threw for constant polynomials
        expect(CompHornerK([5], 1.5, 4)).toEqual(5);
        expect(CompHornerK([], 1.5, 4)).toEqual(0);
        expect(CompHornerK([2, 3], 1.5, 4)).toEqual(6);
        expect(CompHornerK([2, 3], 1.5, 1)).toEqual(6);
        expect(CompHornerK([1, 2, 3], 2, 4)).toEqual(11);
        expect(conditionNumber([5], 1.5)).toEqual(1);
    });

    it('should be about K times more accurate than Horner', function() {
        // (x-1)^7 at x = 1 + 2^-20 equals 2^-140 exactly
        const p = [1, -7, 21, -35, 35, -21, 7, -1];
        const x = 1 + 2**-20;
        const exact = 2**-140;

        // K === 2 (once compensated) is accurate to ~2^-106 relative to the
        // largest term (35), i.e. ~4e-31 absolute - not good enough
        // K === 3 is accurate to ~2^-159 * 35, i.e. ~5e-47 absolute
        expect(Math.abs(CompHornerK(p, x, 3) - exact)).toBeLessThan(1e-45);
        // K === 4 is accurate to ~2^-212 * 35, i.e. ~5e-63 absolute
        expect(Math.abs(CompHornerK(p, x, 4) - exact)).toBeLessThan(1e-55);
        expect(Math.abs(CompHornerK(p, x, 4) - exact) / exact).toBeLessThan(1e-12);
    });
});
