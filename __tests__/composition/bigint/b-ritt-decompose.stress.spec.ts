import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bCompose } from '../../../src/composition/bigint/b-compose.js';
import { bRittDecompose, bRittRecompose } from '../../../src/composition/bigint/b-ritt-decompose.js';
import { bChangeVariablesLinear } from '../../../src/change-variables/bigint/b-change-variables-linear.js';


describe('bRittDecompose stress', function() {
    it('should pass a deterministic affine-conjugation stress sweep', function() {
        const outers: bigint[][] = [
            [1n, 0n, 0n],
            [2n, -3n, 5n],
            [3n, -2n, 5n, 7n],
            [-1n, 4n, -6n, 3n]
        ];
        const inners: bigint[][] = [
            [1n, 1n, 0n],
            [2n, -1n, 3n],
            [-2n, 3n, 0n],
            [1n, -2n, 3n, 0n]
        ];

        const ss = [1n, -1n];
        const ts = [-4n, -1n, 0n, 2n, 5n];

        let checked = 0;

        for (const g0 of outers) {
            for (const h0 of inners) {
                const dG = g0.length - 1;
                const dH = h0.length - 1;
                if (dG < 2 || dH < 2) {
                    continue;
                }

                for (const s of ss) {
                    for (const t of ts) {
                        // L(u) = s*u + t with inverse L^{-1}(u) = s*u - s*t (s = +/-1).
                        const g = bChangeVariablesLinear(g0, s, -s * t);
                        const h = bCompose([s, t], h0);
                        const p = bCompose(g, h);

                        const factors = bRittDecompose(p);
                        expect(factors.length).toBeGreaterThanOrEqual(2);
                        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
                        checked++;
                    }
                }
            }
        }

        // Guard to ensure this really is a nontrivial sweep.
        expect(checked >= 40).toEqual(true);
    });

    it('should pass a deterministic nested-chain sweep', function() {
        const f1s: bigint[][] = [
            [1n, 1n, 0n],
            [2n, -1n, 3n],
            [3n, -7n, 5n, 11n]
        ];
        const f2s: bigint[][] = [
            [1n, 2n, 0n],
            [2n, -1n, 1n],
            [1n, 0n, -3n, 0n]
        ];
        const f3s: bigint[][] = [
            [1n, 1n, 0n],
            [2n, 1n, 3n],
            [1n, -2n, 3n, 0n]
        ];

        let checked = 0;

        for (const f1 of f1s) {
            for (const f2 of f2s) {
                for (const f3 of f3s) {
                    const p = bCompose(f1, bCompose(f2, f3));
                    const factors = bRittDecompose(p);

                    expect(factors.length).toBeGreaterThanOrEqual(2);
                    expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
                    checked++;
                }
            }
        }

        expect(checked).toEqual(f1s.length * f2s.length * f3s.length);
    });

    it('should handle large leading coefficients in complete search mode', function() {
        const g = [1234567n, -31n, 5n];
        const h = [10n, 3n, -2n];
        const p = bCompose(g, h);

        const factors = bRittDecompose(p, { completeInnerLeadingCoeffSearch: true });
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should expose a fast heuristic mode', function() {
        const g = [1234567n, -31n, 5n];
        const h = [10n, 3n, -2n];
        const p = bCompose(g, h);

        const factors = bRittDecompose(p, { completeInnerLeadingCoeffSearch: false });
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should return canonically normalized inner factors', function() {
        const g0 = [5n, 2n, 1n];
        const h0 = [-2n, 3n, 7n];
        const p = bCompose(g0, h0);

        const factors = bRittDecompose(p, { completeInnerLeadingCoeffSearch: true });
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);

        // Inner factors (all except the first) are normalized by construction:
        // leading coefficient positive and constant term zero.
        for (let i = 1; i < factors.length; i++) {
            const f = factors[i];
            expect(f[0] > 0n).toEqual(true);
            expect(f[f.length - 1]).toEqual(0n);
        }
    });
});
