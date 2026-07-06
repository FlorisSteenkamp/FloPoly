import { describe, expect, it } from '@jest/globals';
import { bAdd } from '../../../src/basic/bigint/b-add.js';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';
import { bMultiplyByConst } from '../../../src/basic/bigint/b-multiply-by-const.js';
import { bDivmod } from '../../../src/division/bigint/b-divmod.js';


describe('bDivmod', function() {
    it('should return exact quotient and remainder for divisible inputs', function() {
        const a = [1n, 0n, -1n];
        const b = [1n, -1n];
        const { q, r, m } = bDivmod(a, b);

        expect(bEqual(q, [1n, 1n])).toEqual(true);
        expect(bEqual(r, [])).toEqual(true);
        expect(m).toEqual(1n);
    });

    it('should satisfy m*a = b*q + r for pseudo-division cases', function() {
        const a = [1n];
        const b = [2n];
        const { q, r, m } = bDivmod(a, b);

        const lhs = bMultiplyByConst(m, a);
        const rhs = bAdd(bMultiply(b, q), r);

        expect(bEqual(lhs, rhs)).toEqual(true);
        expect(m).toEqual(2n);
    });

    it('should return q=[] and r=a when degree(a) < degree(b)', function() {
        const a = [3n, 4n];
        const b = [1n, 0n, 1n];
        const { q, r, m } = bDivmod(a, b);

        expect(bEqual(q, [])).toEqual(true);
        expect(bEqual(r, a)).toEqual(true);
        expect(m).toEqual(1n);
    });

    it('should throw for zero divisor polynomial', function() {
        expect(() => bDivmod([1n, 2n], [])).toThrow('division by zero polynomial');
    });
});
