import { describe, expect, it } from '@jest/globals';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { brentPoly } from '../../../src/roots/naive/brent-poly.js';
import { brent } from '../../../src/roots/naive/brent.js';
import { bisection } from '../../../src/roots/naive/bisection.js';
import { Horner } from '../../../src/evaluate/double/horner.js';


describe('naive root finders with tiny function values', function() {
    // Regression: sign tests via products (`fa*fb < 0`) underflowed to zero
    // for values around 1e-170 and brackets were misclassified
    const p = [1e-170, -3e-170, 2e-170];  // 1e-170 * (x - 1)(x - 2)

    it('allRoots should find roots when all function values are tiny', function() {
        const rs = allRoots(p);
        expect(rs.length).toEqual(2);
        expect(Math.abs(rs[0] - 1)).toBeLessThan(1e-12);
        expect(Math.abs(rs[1] - 2)).toBeLessThan(1e-12);
    });

    it('brentPoly / brent / bisection should converge when all function values are tiny', function() {
        expect(Math.abs(brentPoly(p, 0.5, 1.5) - 1)).toBeLessThan(1e-12);
        expect(Math.abs(brent(x => Horner(p, x), 1.5, 2.5) - 2)).toBeLessThan(1e-12);
        expect(Math.abs(bisection(x => Horner(p, x), 0.5, 1.5) - 1)).toBeLessThan(1e-12);
        expect(() => bisection(x => Horner(p, x), 1.1, 1.9)).toThrow();  // not bracketed
    });
});
