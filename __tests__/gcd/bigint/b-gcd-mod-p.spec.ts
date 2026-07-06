import { describe, expect, it } from '@jest/globals';
import { bGcdModP } from '../../../src/gcd/bigint/b-gcd-mod-p.js';
import { bPdivModP } from '../../../src/euclidean-division-related/bigint/b-pdiv-mod-p.js';


function expectDividesModP(
        dividend: bigint[],
        divisor: bigint[],
        p: bigint) {

    const { r } = bPdivModP(dividend, divisor, p);
    expect(r).toEqual([]);
}


describe('bGcdModP', function() {
    it('should find a gcd that divides both inputs modulo p',
    function() {
        const p = 5n;
        const a = [1n, 0n, -1n];
        const b = [1n, -1n];

        const gcd = bGcdModP(a, b, p);

        expect(gcd.length).toEqual(2);
        expectDividesModP(a, gcd, p);
        expectDividesModP(b, gcd, p);
    });


    it('should recover the shared quadratic factor modulo p',
    function() {
        const p = 7n;
        const a = [1n, 0n, -2n, 0n];
        const b = [1n, 0n, -2n];

        const gcd = bGcdModP(a, b, p);

        expect(gcd.length).toEqual(3);
        expectDividesModP(a, gcd, p);
        expectDividesModP(b, gcd, p);
    });


    it('should handle zero-polynomial edge cases',
    function() {
        expect(bGcdModP([], [3n, 4n, 5n], 11n)).toEqual([3n, 4n, 5n]);
        expect(bGcdModP([3n, 4n, 5n], [], 11n)).toEqual([3n, 4n, 5n]);
    });


    it('should return a nonzero constant gcd when polynomials are coprime modulo p',
    function() {
        const p = 5n;
        const a = [1n, 0n, 1n];
        const b = [1n, 1n];

        const gcd = bGcdModP(a, b, p);

        expect(gcd.length).toEqual(1);
        expect(gcd[0] !== 0n).toEqual(true);
        expectDividesModP(a, gcd, p);
        expectDividesModP(b, gcd, p);
    });
});
