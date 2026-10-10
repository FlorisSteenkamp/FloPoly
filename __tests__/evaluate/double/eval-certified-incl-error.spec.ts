import { describe, expect, it } from '@jest/globals';
import { evalCertifiedInclError } from '../../../src/evaluate/double/eval-certified-incl-error.js';

const { abs } = Math;


describe('evalCertifiedInclError', function() {
    it('should return a non-negative error bound for negative results', function() {
        // Regression: the bound previously included `γ1*r̂` without `abs`
        // -x + 1 at x = 1 + 2^-52 is exactly -2^-52
        const { r̂, e } = evalCertifiedInclError([[-1, 1], [0, 0]], 1 + 2**-52);
        expect(e >= 0).toBe(true);
        expect(abs(r̂ - (-(2**-52))) <= e).toBe(true);
    });

    it('should return an error bound that contains the exact value', function() {
        // (x-1)^3 near 1 - the result is tiny and negative for x < 1
        const p = [[1, -3, 3, -1], [0, 0, 0, 0]];
        for (const x of [1 - 2**-20, 1 - 2**-30, 1 + 2**-20, 0.5, 2, -3]) {
            const exact = (x-1)**3;
            const { r̂, e } = evalCertifiedInclError(p, x);
            expect(e >= 0).toBe(true);
            if (r̂ !== 0) {
                expect(abs(r̂ - exact) <= e).toBe(true);
            }
        }
    });
});
