import { describe, expect, it } from '@jest/globals';
import { compHornerIsFaithful } from '../../../src/evaluate/double/comp-horner-is-faithful.js';
import { Horner } from '../../../src/evaluate/double/horner.js';


describe('compHornerIsFaithful', function() {
    it('should return a certified error bound containing the exact value', function() {
        // (x-1)^7 at x = 1 + 2^-20 equals 2^-140 exactly
        const p = [1, -7, 21, -35, 35, -21, 7, -1];
        const x = 1 + 2**-20;
        const { isFaithful, errBound, r̄ } = compHornerIsFaithful(p, x);
        expect(Math.abs(r̄ - 2**-140) <= errBound).toBe(true);
        // too close to the root for a faithfully rounded result
        expect(isFaithful).toBe(false);
    });

    it('should report faithful rounding for well conditioned evaluations', function() {
        const p = [1, -7, 21, -35, 35, -21, 7, -1];
        for (const x of [3, -2, 0.25, 10]) {
            const exact = (x - 1)**7;
            const { isFaithful, errBound, r̄ } = compHornerIsFaithful(p, x);
            expect(isFaithful).toBe(true);
            expect(Math.abs(r̄ - exact) <= errBound).toBe(true);
            expect(Math.abs(r̄ - exact) <= Math.abs(exact)*2**-50).toBe(true);
        }
        expect(compHornerIsFaithful([1, 2, 3], 2).r̄).toEqual(Horner([1, 2, 3], 2));
    });
});
