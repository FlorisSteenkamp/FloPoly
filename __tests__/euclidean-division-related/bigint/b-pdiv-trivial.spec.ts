import { describe, expect, it } from '@jest/globals';
import { bPdivTrivial } from '../../../src/euclidean-division-related/bigint/b-pdiv-trivial.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';
import { bGcdInt } from '../../../src/gcd/bigint/b-integer-gcd.js';


describe('bPdivTrivial', function() {
    it('should correctly do trivial pseudo division of two polynomials (with bigint coefficients) by keeping coefficients in ℤ',
    function() {
        {
            const a = [17n, -2n, 13n, -3n, 5n];
            const b = [-4n, 5n, -6n];
            const c = [7n, -8n, 9n];
            const p1 = bMultiply(bMultiply(a, b), c);
            const p2 = bMultiply(a, c);
            const res = bPdivTrivial(p1, p2);
            const g = bGcdInt(bGcdInt(-6740636n, 8425795n), -10110954n);
            const qq = res.q.map(x => x/g);
            const r: { q: bigint[]; r: bigint[] } = { q: [-6740636n, 8425795n, -10110954n], r: [] };

            expect(res).toEqual(r);
            expect(qq).toEqual(b);
        }
        {
            const ps = [
                [1n,7n,6n],     // 0
                [1n,-5n,-6n],   // 1
                [1n,6n],        // 2
                [1n,-6n],       // 3
                [1n,1n],        // 4
                [1n,7n,6n,4n],  // 5
                [-1n,6n],       // 6
                [-1n,-6n],      // 7
            ];

            {
                const r = bPdivTrivial(ps[0], ps[2]);  
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n], r: [] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[2], ps[0]);  
                const expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[2] };
                expect(r).toEqual(expected);
            }


            {
                const r = bPdivTrivial(ps[0], ps[4]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n,6n], r: [] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[4], ps[0]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[4] };
                expect(r).toEqual(expected);
            }


            {
                const r = bPdivTrivial(ps[1], ps[3]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n], r: [] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[3], ps[1]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[3] };
                expect(r).toEqual(expected);
            }


            {
                const r = bPdivTrivial(ps[1], ps[4]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n,-6n], r: [] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[4], ps[1]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[4] };
                expect(r).toEqual(expected);
            }


            {
                const r = bPdivTrivial(ps[2], ps[5]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [], r: ps[2] };
                expect(r).toEqual(expected);
            }


            // test positiveMultiplier parameter
            {
                const r = bPdivTrivial(ps[6], ps[7], false);
                const expected: { q: bigint[]; r: bigint[] } = { q: [-1n], r: [-12n] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[7], ps[6], false);
                const expected: { q: bigint[]; r: bigint[] } = { q: [-1n], r: [12n] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[6], ps[7], true);
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n], r: [12n] };
                expect(r).toEqual(expected);
            }
            {
                const r = bPdivTrivial(ps[7], ps[6], true);
                const expected: { q: bigint[]; r: bigint[] } = { q: [1n], r: [-12n] };
                expect(r).toEqual(expected);
            }
        }
        {
            const ps = [
                [1n,0n,1n,0n,-3n,-3n,8n,2n,-5n],
                [3n,0n,5n,0n,-4n,-9n,21n]
            ];

            {
                const r = bPdivTrivial(ps[0], ps[1]);
                const expected: { q: bigint[]; r: bigint[] } = { q: [9n,0n,-6n], r: [-15n,0n,3n,0n,-9n] };
                expect(r).toEqual(expected);
            }
        }
        {
            const a = [1n, -2n, 0n, -4n];
            const b = [1n, -3n];
            const r = bPdivTrivial(a,b);
            const expected: { q: bigint[]; r: bigint[] } = { q: [1n,1n,3n], r: [5n] };
            expect(r).toEqual(expected);
        }
        {
            const a = [10000000000n, 100000n];
            const b = [10000000000n, 100000n];
            const r = bPdivTrivial(a,b);
            const expected: { q: bigint[]; r: bigint[] } = { q: [10000000000n], r: [] };
            expect(r).toEqual(expected);
        }
        {
            const a = [1n, -3n];
            const b = [5n];
            const r = bPdivTrivial(a,b);
            const expected: { q: bigint[]; r: bigint[] } = { q: [5n,-15n], r: [] };
            expect(r).toEqual(expected);
        }
    });
});
