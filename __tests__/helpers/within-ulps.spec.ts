import { describe, expect, it } from '@jest/globals';
import { allWithinUlps, withinUlps } from './within-ulps.js';


describe('withinUlps', function() {
    it('should return true for exactly equal numbers', function() {
        expect(withinUlps(3.5, 3.5, 0)).toBe(true);
    });

    it('should return true when b is within the given ulp tolerance of a', function() {
        expect(withinUlps(1, 1 + Number.EPSILON, 1)).toBe(true);
    });

    it('should return false when b is outside the given ulp tolerance of a', function() {
        expect(withinUlps(1, 1 + 2 * Number.EPSILON, 1)).toBe(false);
    });

    it('should return false for opposite signs (except exact zero equality)', function() {
        expect(withinUlps(2, -2, 1000)).toBe(false);
    });

    it('should treat +0 and -0 as equal', function() {
        expect(withinUlps(0, -0, 0)).toBe(true);
    });

    it('should return false for zero vs nonzero values', function() {
        expect(withinUlps(0, Number.MIN_VALUE, 1000)).toBe(false);
    });

    it('should return true for identical infinities and false for opposite infinities', function() {
        expect(withinUlps(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0)).toBe(true);
        expect(withinUlps(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 1000)).toBe(false);
    });

    it('should return false when either value is NaN', function() {
        expect(withinUlps(Number.NaN, 1, 1)).toBe(false);
        expect(withinUlps(1, Number.NaN, 1)).toBe(false);
        expect(withinUlps(Number.NaN, Number.NaN, 1)).toBe(false);
    });
});


describe('allWithinUlps', function() {
    it('should return true when all entries are within ulps', function() {
        const a = [1, 2, 3];
        const b = [1 + Number.EPSILON, 2, 3 - Number.EPSILON];
        expect(allWithinUlps(a, b, 1)).toBe(true);
    });

    it('should return false when array lengths differ', function() {
        expect(allWithinUlps([1, 2], [1], 1)).toBe(false);
    });

    it('should return false when at least one entry is outside ulps', function() {
        const a = [1, 2, 3];
        const b = [1, 2 + 4 * Number.EPSILON, 3];
        expect(allWithinUlps(a, b, 1)).toBe(false);
    });
});
