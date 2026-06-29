import { describe, expect, it } from '@jest/globals';
import { getUlp } from '../../src/error-analysis/get-ulp.js';
import { MIN_NON_SUBNORMAL } from '../../src/error-analysis/is-subnormal.js';


describe('getUlp', function() {
    it('should return Number.MIN_VALUE for zero and subnormal numbers', function() {
        expect(getUlp(0)).toBe(Number.MIN_VALUE);
        expect(getUlp(-0)).toBe(Number.MIN_VALUE);
        expect(getUlp(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
        expect(getUlp(-Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
        expect(getUlp(Number.MIN_VALUE * 1111111111111112)).toBe(Number.MIN_VALUE);
    });

    it('should return the correct ulp for powers of two', function() {
        expect(getUlp(1)).toBe(2 ** -52);
        expect(getUlp(-1)).toBe(2 ** -52);
        expect(getUlp(2)).toBe(2 ** -51);
        expect(getUlp(-2)).toBe(2 ** -51);
        expect(getUlp(0.5)).toBe(2 ** -53);
        expect(getUlp(-0.5)).toBe(2 ** -53);
    });

    it('should return the correct ulp at the normal boundary', function() {
        expect(getUlp(MIN_NON_SUBNORMAL)).toBe(Number.MIN_VALUE);
        expect(getUlp(-MIN_NON_SUBNORMAL)).toBe(Number.MIN_VALUE);
        expect(getUlp(MIN_NON_SUBNORMAL * 2)).toBe(2 * Number.MIN_VALUE);
    });

    it('should return the same ulp for x and -x', function() {
        const xs = [0.1, 0.45, 1.1, 3, 123.456, Number.MAX_VALUE / 2];

        for (const x of xs) {
            expect(getUlp(x)).toBe(getUlp(-x));
        }
    });

    it('should return the correct ulp for representative finite values', function() {
        expect(getUlp(0.45)).toBe(2 ** -54);
        expect(getUlp(1.1)).toBe(2 ** -52);
        expect(getUlp(3)).toBe(2 ** -51);
        expect(getUlp(Number.MAX_VALUE)).toBe(2 ** 971);
    });

    it('should return NaN for non-finite numbers', function() {
        expect(Number.isNaN(getUlp(Number.POSITIVE_INFINITY))).toBe(true);
        expect(Number.isNaN(getUlp(Number.NEGATIVE_INFINITY))).toBe(true);
        expect(Number.isNaN(getUlp(Number.NaN))).toBe(true);
    });
});
