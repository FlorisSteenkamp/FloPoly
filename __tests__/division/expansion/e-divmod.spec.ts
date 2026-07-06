import { describe, expect, it } from '@jest/globals';
import { eAbs, eSign } from 'big-float-ts';
import { eAdd } from '../../../src/basic/expansion/e-add.js';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eMultiply } from '../../../src/basic/expansion/e-multiply.js';
import { eMultiplyByConst } from '../../../src/basic/expansion/e-multiply-by-const.js';
import { eDivmod } from '../../../src/division/expansion/e-divmod.js';


describe('eDivmod', function() {
    it('should return exact quotient and remainder for divisible inputs', function() {
        const a = [[1], [0], [-1]];
        const b = [[1], [-1]];
        const { q, r, m } = eDivmod(a, b);

        expect(eEqual(q, [[1], [1]])).toEqual(true);
        expect(eEqual(r, [])).toEqual(true);
        expect(m).toEqual([1]);
    });

    it('should satisfy m*a = b*q + r for pseudo-division cases', function() {
        const a = [[1]];
        const b = [[2]];
        const { q, r, m } = eDivmod(a, b);

        const lhs = eMultiplyByConst(m, a);
        const rhs = eAdd(eMultiply(b, q), r);

        expect(eEqual(lhs, rhs)).toEqual(true);
        expect(m).toEqual([2]);
    });

    it('should return q=[] and r=a when degree(a) < degree(b)', function() {
        const a = [[3], [4]];
        const b = [[1], [0], [1]];
        const { q, r, m } = eDivmod(a, b);

        expect(eEqual(q, [])).toEqual(true);
        expect(eEqual(r, a)).toEqual(true);
        expect(m).toEqual([1]);
    });

    it('should support positiveMultiplier by returning non-negative m', function() {
        const a = [[1], [0]];
        const b = [[-2], [1]];
        const { m } = eDivmod(a, b, true);

        expect(eSign(eAbs(m)) > 0).toEqual(true);
        expect(eSign(m) >= 0).toEqual(true);
    });

    it('should throw for zero divisor polynomial', function() {
        expect(() => eDivmod([[1], [2]], [])).toThrow('division by zero polynomial');
    });
});
