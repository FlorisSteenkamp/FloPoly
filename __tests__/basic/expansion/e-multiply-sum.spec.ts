import { describe, expect, it } from '@jest/globals';
import { eMultiply } from '../../../src/basic/expansion/e-multiply.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';
import { eEstimate } from 'big-float-ts';


describe('eMultiply - exactness', function() {
    it('should agree with bigint multiplication for integer coefficients', function() {
        const a = [123456789, -987654321, 1e15, 7, -3];
        const b = [1e15, 2, -5e14, 11];
        const r = eMultiply(a.map(c => [c]), b.map(c => [c]));
        const rB = bMultiply(a.map(c => BigInt(c)), b.map(c => BigInt(c)));
        expect(r.length).toEqual(rB.length);
        for (let i=0; i<r.length; i++) {
            // exact comparison via the (exact) sum of the expansion components
            const sum = r[i].reduce((s, c) => s + BigInt(c), 0n);
            expect(sum).toEqual(rB[i]);
        }
        expect(r.map(eEstimate)).toEqual(rB.map(c => Number(c)));
    });

    it('should not alias coefficient arrays', function() {
        const r = eMultiply([[1], [0], [0]], [[1], [0], [0]]);
        expect(r.length).toEqual(5);
        r[1].push(99);
        expect(r[2]).not.toContain(99);
    });
});
