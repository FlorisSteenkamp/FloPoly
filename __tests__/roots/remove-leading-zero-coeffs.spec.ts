import { describe, expect, it } from '@jest/globals';
import { roots } from '../../src/roots/descartes/roots.js';
import { removeLeadingZeroCoeffs } from '../../src/roots/remove-leading-zero-coeffs.js';
import { γγ3 } from '../../src/error-analysis/gamma.js';


describe('removeLeadingZeroCoeffs', function() {
    it('should not modify the given arrays', function() {
        // Regression: the caller's `pDd` (inner arrays) and `pDd_` were
        // previously modified in place
        const pDd = [[0, 0], [0, 1], [0, -1]];
        const pDd_ = [0, 0, 0];
        const pE = [[0], [1], [-1]];

        const r = removeLeadingZeroCoeffs(pDd, pDd_, () => pE, γγ3);

        expect(pDd).toEqual([[0, 0], [0, 1], [0, -1]]);
        expect(pDd_).toEqual([0, 0, 0]);
        expect(r.pDd).toEqual([[0, 1], [0, -1]]);
        expect(r.pDd_.length).toEqual(2);
        expect(r.pExact).toEqual([[1], [-1]]);
    });

    it('should return the given arrays as is if the leading coefficient is certifiably non-zero', function() {
        const pDd = [[0, 2], [0, 1]];
        const pDd_ = [0, 0];

        const r = removeLeadingZeroCoeffs(pDd, pDd_, () => { throw new Error('should not be called'); }, γγ3);

        expect(r.pDd).toBe(pDd);
        expect(r.pDd_).toBe(pDd_);
    });

    it('`roots` should not modify its inputs', function() {
        const pDd = [[0, 0], [0, 1], [0, -1]];
        const pDd_ = [0, 0, 0];

        const rs = roots(pDd, -10, 10, pDd_)!;

        expect(rs.length).toEqual(1);
        expect(rs[0].tS <= 1 && rs[0].tE >= 1).toBe(true);
        expect(pDd).toEqual([[0, 0], [0, 1], [0, -1]]);
        expect(pDd_).toEqual([0, 0, 0]);
    });
});
