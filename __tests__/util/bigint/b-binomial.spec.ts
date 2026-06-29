import { describe, expect, it } from '@jest/globals';
import { bBinomial } from '../../../src/util/bigint/b-binomial.js';
import { binomial } from '../../../src/util/double/binomial.js';


describe('binomial', function() {
    it('returns known values', function() {
        expect(bBinomial(5n, 3n)).toBe(10n);
        expect(bBinomial(10n, 0n)).toBe(1n);
        expect(bBinomial(10n, 10n)).toBe(1n);
    });

    it('works when extending beyond initial cache size', function() {
        expect(bBinomial(12n, 6n)).toBe(924n);
    });

    it('can calculate binomial coefficients for large(ish) n and k', function() {
        expect(bBinomial(1000n, 125n)).toBe(1623148717954158512058820936685901511744209966495470849315774911095647761741132805364893887838828578173972350490703299080562242349981359743426400338806768312283008n);
    });

    it('throws when n exceeds maximum supported limit', function() {
        expect(() => bBinomial(1001n, 3n)).toThrow();
    });

    it('returns values beyond what double precision can handle', function() {
        expect(bBinomial(250n, 125n)).toBe(91208366928185711600087718663295946582847985411225264672245111235434562752n);
    });

    for (let n=0n; n<=60n; n += 2n) {
        it(`matches double binomial for n=${n} and k=${n/2n}`, function() {
            const r = bBinomial(n, n/2n);
            expect(r).toBe(BigInt(binomial(Number(n), Number(n/2n))));
        });
    }
});
