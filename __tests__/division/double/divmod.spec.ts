import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { divmod } from '../../../src/division/double/divmod.js';


describe('divmod', function() {
    it('should divide exactly when divisible', function() {
        const a = [1, 0, -1];
        const b = [1, -1];
        const { q, r } = divmod(a, b);

        expect(equal(q, [1, 1])).toEqual(true);
        expect(equal(r, [])).toEqual(true);
    });

    it('should return empty quotient when dividend degree is smaller', function() {
        const a = [2, 3];
        const b = [1, 0, 1];
        const { q, r } = divmod(a, b);

        expect(equal(q, [])).toEqual(true);
        expect(equal(r, a)).toEqual(true);
    });

    it('should handle non-monic divisors over doubles', function() {
        const a = [1, 0, 0];
        const b = [2, 0];
        const { q, r } = divmod(a, b);

        expect(equal(q, [0.5, 0])).toEqual(true);
        expect(equal(r, [])).toEqual(true);
    });

    it('should throw for zero divisor polynomial', function() {
        expect(() => divmod([1, 2, 3], [])).toThrow('division by zero polynomial');
        expect(() => divmod([1, 2, 3], [0, 0])).toThrow('division by zero polynomial');
    });

    it('should terminate for divisors whose leading term does not cancel exactly', function() {
        // Regression: these previously looped forever since the leading
        // term of the remainder was expected to cancel exactly
        {
            const { q, r } = divmod([1, 0], [49, 1]);
            expect(q).toEqual([1/49]);
            expect(r).toEqual([-(1/49)]);
        }
        {
            const { q, r } = divmod([5e-324, 0], [49, 1]);
            expect(q.length).toBeLessThanOrEqual(1);
            expect(r.length).toBeLessThanOrEqual(1);
        }
        {
            // the quotient (1e-600) underflows to 0 so both `q` and `r` are
            // the zero polynomial
            const { q, r } = divmod([1e-300, 0], [1e300, 1]);
            expect(q).toEqual([]);
            expect(r).toEqual([]);
        }
        {
            // x^3 + 2x^2 + 3x + 4 = (3x + 1)(x^2/3 + 5x/9 + 22/27) + 86/27
            const { q, r } = divmod([1, 2, 3, 4], [3, 1]);
            expect(q.length).toEqual(3);
            expect(r.length).toEqual(1);
            expect(Math.abs(q[0] - 1/3)).toBeLessThan(1e-15);
            expect(Math.abs(q[1] - 5/9)).toBeLessThan(1e-15);
            expect(Math.abs(q[2] - 22/27)).toBeLessThan(1e-15);
            expect(Math.abs(r[0] - 86/27)).toBeLessThan(1e-14);
        }
    });

    it('should ignore leading zeros of the divisor', function() {
        const { q, r } = divmod([1, 0, -1], [0, 1, -1]);
        expect(equal(q, [1, 1])).toEqual(true);
        expect(equal(r, [])).toEqual(true);
    });
});
