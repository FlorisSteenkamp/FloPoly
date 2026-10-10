import { describe, expect, it } from '@jest/globals';
import { bRittDecompose, bRittRecompose } from '../../../src/composition/bigint/b-ritt-decompose.js';
import { bCompose } from '../../../src/composition/bigint/b-compose.js';


describe('bRittDecompose - large leading coefficients', function() {
    it('should be fast for a leading coefficient with large prime factors', function() {
        // Regression: the leading coefficient was trial-division-factorized
        // (seconds for this case; effectively forever for 30-digit semiprimes)
        const lc = 998244353n * 1000000007n;
        const p = [lc, 0n, 1n, 0n, 1n];  // (lc·u^2 + u + 1)∘(x^2)
        const t0 = Date.now();
        const fs = bRittDecompose(p);
        expect(Date.now() - t0).toBeLessThan(500);
        expect(fs).toEqual([[lc, 1n, 1n], [1n, 0n, 0n]]);
        expect(bRittRecompose(fs)).toEqual(p);
    });

    it('should handle a 30-digit semiprime leading coefficient', function() {
        const lc = 1000000000000000000000000000057n * 999999999999999999999999999989n;
        const h = [3n, 7n, 0n];              // 3x^2 + 7x
        const g = [lc, -5n, 11n, 2n];        // lc·u^3 - 5u^2 + 11u + 2
        const p = bCompose(g, h);
        const t0 = Date.now();
        const fs = bRittDecompose(p);
        expect(Date.now() - t0).toBeLessThan(500);
        expect(fs.length).toEqual(2);
        expect(bRittRecompose(fs)).toEqual(p);
    });

    it('should still find decompositions with non-monic and non-trivially scaled inner polynomials', function() {
        const cases: [bigint[], bigint[]][] = [
            [[2n, 1n, 3n], [6n, 0n, 1n, 0n]],            // inner 6x^3 + x
            [[1n, 0n, -1n], [2n, 4n, 1n]],               // inner 2x^2 + 4x + 1
            [[7n, 1n], [5n, -3n, 2n, 9n]],               // linear outer - still a decomposition
            [[1n, 0n, 0n], [1n, 0n, 0n, 1n]],            // (u^2)∘(x^3 + 1)
        ];
        for (const [g, h] of cases) {
            const p = bCompose(g, h);
            const fs = bRittDecompose(p);
            expect(bRittRecompose(fs)).toEqual(p);
            // non-linear factors only appear if the degrees allow it
            if (g.length > 2 && h.length > 2) {
                expect(fs.length).toBeGreaterThanOrEqual(2);
            }
        }
    });

    it('should leave indecomposable polynomials unchanged', function() {
        expect(bRittDecompose([1n, 1n, 1n, 1n])).toEqual([[1n, 1n, 1n, 1n]]);
        expect(bRittDecompose([1n, 0n, 0n, 0n, 1n, 0n])).toEqual([[1n, 0n, 0n, 0n, 1n, 0n]]);  // x^5 + x
        expect(bRittDecompose([1n, 0n, 0n, 2n])).toEqual([[1n, 0n, 0n, 2n]]);  // prime degree
    });
});
