import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { mobius } from '../../../src/change-variables/double/mobius.js';


describe('mobius', function() {
    it('should apply the Mobius transform for a simple quadratic case', function() {
        // p(x) = x^2 + 2x + 3
        const p = [1, 2, 3];

        // q(x) = (x+1)^2 * p((2x+5)/(x+1)) = 11x^2 + 40x + 38
        const q = mobius(p, 2, 5);

        expect(equal(q, [11, 40, 38])).toEqual(true);
    });

    it('should return [] for the zero polynomial', function() {
        expect(equal(mobius([], 1, 3), [])).toEqual(true);
    });

    it('should produce expected coefficients for a cubic', function() {
        // p(x) = x^3 - 2x^2 + x + 1
        const p = [1, -2, 1, 1];

        // q(x) = (x+1)^3 * p((3x+4)/(x+1)) = 13x^3 + 55x^2 + 78x + 37
        const q = mobius(p, 3, 4);

        expect(equal(q, [13, 55, 78, 37])).toEqual(true);
    });
});
