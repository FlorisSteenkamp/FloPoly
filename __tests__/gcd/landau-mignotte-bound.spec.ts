import { describe, expect, it } from '@jest/globals';
import { bPrimitivePart } from '../../src/factor/bigint/b-primitive-part.js';
import { bLandauMignotteBound } from '../../src/gcd/bigint/landau-mignotte-bound.js';
import { bGcdPrs } from '../../src/gcd/bigint/b-gcd-prs.js';

const { ceil } = Math;


describe('LindauMignotteBound', function() {
    it('should Lindau Mignotte Bound (actually a corollary of it)', function() {
        {
            const p = [4n,-3n,1n,2n,4n,-20n];    // some polynomial
            const q = [1n,-13n,3n,-8n,14n,12n];  // ...

            const gcd = bPrimitivePart(bGcdPrs(p, q));//?
            const cBound = ceil(bLandauMignotteBound(p,q));//?

            for (let i=0; i<gcd.length; i++) {
                expect(gcd[i] <= cBound).toBe(true);
            }
        }
        {
            // Near-tight primitive linear gcd: the largest coefficient is about half the bound.
            const p = [1000000000039n, 1n];
            const q = [1000000000039n, 1n];

            const gcd = bPrimitivePart(bGcdPrs(p, q));
            const cBound = bLandauMignotteBound(p, q);
            const maxCoeff = gcd.reduce((m, c) => {
                const a = c < 0n ? -c : c;
                return a > m ? a : m;
            }, 0n);

            // maxCoeff;//?
            // cBound;//?
            expect(maxCoeff <= BigInt(ceil(cBound))).toBe(true);
            expect(Number(maxCoeff) / cBound).toBeGreaterThan(0.49);
        }
    });

    it('should handle a higher-degree sparse primitive gcd that still gets reasonably close to the bound', function() {
        const maxAbs = (p: bigint[]) => p.reduce((m, c) => {
            const a = c < 0n ? -c : c;
            return a > m ? a : m;
        }, 0n);

        // Degree-8 sparse primitive gcd. For sparse primitive polynomials of the
        // form a*x^d + 1, the Landau-Mignotte bound scales like 2^d times the
        // largest coefficient, so the ratio stays small but still measurable.
        const p = [1000000000039n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 1n];
        const q = [1000000000039n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 1n];

        const gcd = bPrimitivePart(bGcdPrs(p, q));
        const cBound = bLandauMignotteBound(p, q);
        const ratio = Number(maxAbs(gcd)) / cBound;

        expect(maxAbs(gcd) <= BigInt(ceil(cBound))).toBe(true);
        expect(gcd.length - 1).toEqual(8);
        // ratio;//?
        expect(ratio).toBeGreaterThan(0.003);
    });
});



