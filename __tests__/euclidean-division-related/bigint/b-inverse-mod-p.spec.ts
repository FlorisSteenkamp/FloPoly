import { describe, expect, it } from '@jest/globals';
import { bInverseModP } from '../../../src/euclidean-division-related/bigint/b-inverse-mod-p.js';


describe('bInverseModP', function() {
    it('should return the multiplicative inverse in [0,p)', function() {
        // Regression: a negative representative was previously returned
        expect(bInverseModP(2n, 5n)).toEqual(3n);
        expect(bInverseModP(3n, 7n)).toEqual(5n);
        expect(bInverseModP(3n, 11n)).toEqual(4n);
        expect(bInverseModP(1n, 11n)).toEqual(1n);
        expect(bInverseModP(10n, 11n)).toEqual(10n);
        for (const p of [7n, 11n, 101n, 65537n, 1000000007n]) {
            for (let a = 1n; a < (p < 50n ? p : 50n); a++) {  // `a` and `p` coprime
                const inv = bInverseModP(a, p);
                expect(inv >= 0n && inv < p).toBe(true);
                expect((a*inv) % p).toEqual(1n);
            }
        }
    });
});
