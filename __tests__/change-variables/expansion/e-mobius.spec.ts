import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eMobius } from '../../../src/change-variables/expansion/e-mobius.js';


describe('eMobius', function() {
    it('should apply the Mobius transform for a simple quadratic case', function() {
        // p(x) = x^2 + 2x + 3
        const p = [[1], [2], [3]];

        // q(x) = (x+1)^2 * p((2x+5)/(x+1)) = 11x^2 + 40x + 38
        const q = eMobius(p, 2, 5);

        expect(eEqual(q, [[11], [40], [38]])).toEqual(true);
    });

    it('should return [] for the zero polynomial', function() {
        expect(eEqual(eMobius([], 1, 3), [])).toEqual(true);
    });
});
