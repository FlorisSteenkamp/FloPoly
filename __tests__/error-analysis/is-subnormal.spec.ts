import { describe, expect, it } from '@jest/globals';
import { isSubnormal, MIN_NON_SUBNORMAL } from '../../src/error-analysis/is-subnormal.js';


describe('isSubnormal', function() {
    it('should return true for positive subnormal numbers', function() {
        expect(isSubnormal(Number.MIN_VALUE)).toBe(true);     // smallest positive subnormal
        expect(isSubnormal(2 * Number.MIN_VALUE)).toBe(true);
        expect(isSubnormal(MIN_NON_SUBNORMAL / 2)).toBe(true);
    });

    it('should return true for negative subnormal numbers', function() {
        expect(isSubnormal(-Number.MIN_VALUE)).toBe(true);
        expect(isSubnormal(-2 * Number.MIN_VALUE)).toBe(true);
        expect(isSubnormal(-MIN_NON_SUBNORMAL / 2)).toBe(true);
    });

    it('should return false for zero and negative zero', function() {
        expect(isSubnormal(0)).toBe(false);
        expect(isSubnormal(-0)).toBe(false);
    });

    it('should return false for normal boundary and normal numbers', function() {
        expect(isSubnormal(MIN_NON_SUBNORMAL)).toBe(false);
        expect(isSubnormal(-MIN_NON_SUBNORMAL)).toBe(false);
        expect(isSubnormal(1)).toBe(false);
        expect(isSubnormal(-1)).toBe(false);
        expect(isSubnormal(Number.MAX_VALUE)).toBe(false);
    });

    it('should return false for infinities and NaN', function() {
        expect(isSubnormal(Number.POSITIVE_INFINITY)).toBe(false);
        expect(isSubnormal(Number.NEGATIVE_INFINITY)).toBe(false);
        expect(isSubnormal(Number.NaN)).toBe(false);
    });
});
