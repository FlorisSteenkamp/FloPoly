import { describe, expect, it } from '@jest/globals';
import { bSqrtCeil } from '../../../src/util/bigint/b-sqrt-ceil.js';


describe('bSqrtCeil', function() {
    it('should return the ceiling of the square root', function() {
        expect(bSqrtCeil(0n)).toEqual(0n);
        expect(bSqrtCeil(1n)).toEqual(1n);
        expect(bSqrtCeil(2n)).toEqual(2n);
        expect(bSqrtCeil(3n)).toEqual(2n);
        expect(bSqrtCeil(4n)).toEqual(2n);
        expect(bSqrtCeil(5n)).toEqual(3n);
        expect(bSqrtCeil(99n)).toEqual(10n);
        expect(bSqrtCeil(100n)).toEqual(10n);
        expect(bSqrtCeil(101n)).toEqual(11n);
        for (let s = 2n; s < 2000n; s += 7n) {
            expect(bSqrtCeil(s*s)).toEqual(s);
            expect(bSqrtCeil(s*s - 1n)).toEqual(s);
            expect(bSqrtCeil(s*s + 1n)).toEqual(s + 1n);
        }
        const big = 10n**200n + 12345n;
        expect(bSqrtCeil(big*big)).toEqual(big);
        expect(bSqrtCeil(big*big + 1n)).toEqual(big + 1n);
        expect(bSqrtCeil(big*big - 1n)).toEqual(big);
    });

    it('should throw for negative input', function() {
        expect(() => bSqrtCeil(-1n)).toThrow();
    });
});
