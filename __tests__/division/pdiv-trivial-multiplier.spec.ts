import { describe, expect, it } from '@jest/globals';
import { bPdivTrivial } from '../../src/euclidean-division-related/bigint/b-pdiv-trivial.js';
import { ePdivTrivial } from '../../src/euclidean-division-related/expansion/e-pdiv-trivial.js';
import { bDivmod } from '../../src/division/bigint/b-divmod.js';
import { eDivmod } from '../../src/division/expansion/e-divmod.js';
import { bMultiply } from '../../src/basic/bigint/b-multiply.js';
import { bAdd } from '../../src/basic/bigint/b-add.js';
import { bMultiplyByConst } from '../../src/basic/bigint/b-multiply-by-const.js';


describe('pseudo-division multiplier', function() {
    it('bPdivTrivial / bDivmod should return the multiplier m with m*a = b*q + r', function() {
        const a = [2n, -3n, 4n, 5n, -1n];
        const b = [3n, 1n, -2n];
        for (const positive of [false, true]) {
            const { q, r, m } = bPdivTrivial(a, b, positive);
            expect(m).toEqual(positive ? 27n : 27n);  // 3^3
            expect(bAdd(bMultiply(b, q), r)).toEqual(bMultiplyByConst(m, a));
            expect(bDivmod(a, b, positive)).toEqual({ q, r, m });
        }
        const bNeg = [-3n, 1n, -2n];
        expect(bPdivTrivial(a, bNeg).m).toEqual(-27n);
        expect(bPdivTrivial(a, bNeg, true).m).toEqual(27n);
        expect(bPdivTrivial([1n, 2n], [1n, 0n, 1n])).toEqual({ q: [], r: [1n, 2n], m: 1n });
        expect(bDivmod([1n, 2n], [1n, 0n, 1n])).toEqual({ q: [], r: [1n, 2n], m: 1n });
    });

    it('ePdivTrivial / eDivmod should return the multiplier m', function() {
        const a = [[2], [-3], [4], [5], [-1]];
        const b = [[3], [1], [-2]];
        const res = ePdivTrivial(a, b);
        expect(res.m).toEqual([27]);
        expect(eDivmod(a, b)).toEqual(res);
        expect(ePdivTrivial(a, [[-3], [1], [-2]]).m).toEqual([-27]);
        expect(ePdivTrivial(a, [[-3], [1], [-2]], true).m).toEqual([27]);
    });
});
