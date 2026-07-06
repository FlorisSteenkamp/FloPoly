import { describe, expect, it } from '@jest/globals';
import { bIsRationalMultipleOf } from '../../../src/basic/bigint/b-is-rational-multiple-of.js';
import { multiply } from '../../../src/basic/double/multiply.js';
import { differentiate } from '../../../src/calculus/double/differentiate.js';
import { bPrimitivePart } from '../../../src/factor/bigint/b-primitive-part.js';
import { gcdPrs } from '../../../src/gcd/double/gcd-prs.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';


describe('gcdPrs', function() {
    it('should find the GCD of two polynomials correctly', 
    function() {
        {
            // Coprime polynomials should have constant gcd.
            const a = [2, -2, 1];
            const b = [4, -2];
            const gcd = gcdPrs(a, b);
            expect(bIsRationalMultipleOf(gcd, [1n])).toEqual(true);
        }

        {
            // Identical polynomials should be returned up to a rational multiple.
            const a = [1e10, 1e5];
            const b = [1e10, 1e5];
            const gcd = gcdPrs(a, b);
            expect(bIsRationalMultipleOf(gcd, [10000000000n, 100000n])).toEqual(true);
        }

        {
            // Another coprime pair with different degrees.
            const a = [1, -2, 0, -4];
            const b = [1, -3];
            const gcd = gcdPrs(a, b);
            expect(bIsRationalMultipleOf(gcd, [1n])).toEqual(true);
        }

        {
            // Non-trivial quadratic gcd.
            const a = [1, -4, 4, -3, 14];
            const b = [1, 8, 12, 17, 6];
            const gcd = gcdPrs(a, b);
            expect(bIsRationalMultipleOf(gcd, [1n, 1n, 2n])).toEqual(true);
        }

        {
            // A repeated linear factor should be shared with the derivative.
            const p1 = multiply([2, -2], [3, -3]);
            const dp1 = differentiate(p1);
            const gcd = gcdPrs(p1, dp1);

            expect(bIsRationalMultipleOf(gcd, [1n, -1n])).toEqual(true);
        }

        {
            // A quadruple root yields a cubic gcd with the derivative.
            const p1 = multiply([2, -2], [3, -3]);
            const p4 = multiply([100, -100], [11, -11]);
            const p5 = multiply(p1, p4);

            const dp5 = differentiate(p5);
            const gcd = gcdPrs(p5, dp5);

            expect(bPrimitivePart(gcd)).toEqual([
                1n, -3n, 3n, -1n
            ]);
        }

        {
            // A square-free polynomial should have constant gcd with its derivative.
            const p1 = fromRoots([1, 5, 6, 7, 8, 9]);
            const dp1 = differentiate(p1);
            const gcd = gcdPrs(p1, dp1);

            expect(gcd.length === 1).toEqual(true);
        }

        {
            // A polynomial with repeated roots should share the repeated factor.
            const p1 = fromRoots([7, 7, 6, 7, 8, 9]);
            const dp1 = differentiate(p1);
            const gcd = gcdPrs(p1, dp1);

            expect(bIsRationalMultipleOf(gcd, [432n, -6048n, 21168n])).toEqual(true);
        }

        {
            // Repeated irreducible quadratic factor.
            const p1 = multiply([1, 0, 1], [1, 0, 1]);
            const dp1 = differentiate(p1);
            const gcd = gcdPrs(p1, dp1);

            expect(bIsRationalMultipleOf(gcd, [1n, 0n, 1n])).toEqual(true);
        }

        {
            // Fractional coefficients should be scaled to an integer gcd consistently.
            const p1 = multiply([1, -0.5], [1, -0.25]);
            const p2 = multiply([1, -0.5], [1, -0.75]);
            const gcd = gcdPrs(p1, p2);

            expect(bIsRationalMultipleOf(gcd, [2n, -1n])).toEqual(true);
        }

        {
            // Swapping inputs should not change the gcd up to a rational multiple.
            const p1 = multiply([1, -0.5], [1, -0.25]);
            const p2 = multiply([1, -0.5], [1, -0.75]);

            const gcd1 = gcdPrs(p1, p2);
            const gcd2 = gcdPrs(p2, p1);

            expect(bIsRationalMultipleOf(gcd1, gcd2)).toEqual(true);
            expect(bIsRationalMultipleOf(gcd2, gcd1)).toEqual(true);
        }

        {
            // Constant inputs should still produce a constant gcd.
            const gcd = gcdPrs([0.5], [1.5]);

            expect(gcd.length).toEqual(1);
            expect(bIsRationalMultipleOf(gcd, [1n])).toEqual(true);
        }

        {
            // Empty-input fast paths should also work for fractional coefficients.
            const p1: number[] = [];
            const p2 = [0.5, 1];

            const gcd1 = gcdPrs(p1, p2);
            const gcd2 = gcdPrs(p2, p1);

            expect(gcd1).toEqual([1n, 2n]);
            expect(gcd2).toEqual([1n, 2n]);
        }

        {
            // The empty polynomial acts as the zero input edge case.
            const p1: number[] = [];
            const p2 = multiply([1, 0, 1], [1, 0, 1]);

            const gcd1 = gcdPrs(p1, p2);
            const gcd2 = gcdPrs(p2, p1);

            expect(gcd1).toEqual(p2.map(c => BigInt(c)));
            expect(gcd2).toEqual(p2.map(c => BigInt(c)));
        }
    });
});
