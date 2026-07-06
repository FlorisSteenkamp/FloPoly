import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bCompose } from '../../../src/composition/bigint/b-compose.js';
import { bRittDecompose, bRittRecompose } from '../../../src/composition/bigint/b-ritt-decompose.js';
import { bChangeVariablesLinear } from '../../../src/change-variables/bigint/b-change-variables-linear.js';


describe('bRittDecompose', function() {
    it('should decompose a non-power composition (x^2)∘(x^2+x)', function() {
        const g = [1n, 0n, 0n];      // x^2
        const h = [1n, 1n, 0n];      // x^2 + x
        const p = bCompose(g, h);    // x^4 + 2x^3 + x^2

        const factors = bRittDecompose(p);
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should decompose nested power compositions', function() {
        const x2 = [1n, 0n, 0n];
        const p = bCompose(x2, bCompose(x2, x2)); // x^8

        const factors = bRittDecompose(p);
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should leave indecomposable polynomials unchanged', function() {
        const p = [1n, 0n, 1n, 1n]; // x^3 + x + 1

        const factors = bRittDecompose(p);
        expect(factors.length).toEqual(1);
        expect(bEqual(factors[0], p)).toEqual(true);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should decompose when the inner factor is non-monic', function() {
        const g = [1n, 1n, 0n];      // x^2 + x
        const h = [2n, 1n, 0n];      // 2x^2 + x
        const p = bCompose(g, h);

        const factors = bRittDecompose(p);
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should handle a harder nested mixed-coefficient case', function() {
        // p(x) = f1(f2(f3(x))) with degree 18 and mixed signs.
        const f1 = [3n, -7n, 5n, 11n];      // degree 3
        const f2 = [1n, 4n, 0n];            // x^2 + 4x
        const f3 = [1n, -2n, 3n, 0n];       // x^3 - 2x^2 + 3x

        const p = bCompose(f1, bCompose(f2, f3));

        const factors = bRittDecompose(p);
        // p;//?
        // factors;//?
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should decompose when the inner polynomial has a nonzero constant term', function() {
        const g = [1n, 1n, 0n];        // x^2 + x
        const h = [2n, 1n, 3n];        // 2x^2 + x + 3
        const p = bCompose(g, h);

        const factors = bRittDecompose(p);
        expect(factors.length).toBeGreaterThanOrEqual(2);
        expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
    });

    it('should handle affine conjugation in the middle variable', function() {
        // Base decomposition p0 = g0(h0(x)).
        const g0 = [3n, -2n, 5n, 7n];
        const h0 = [2n, -1n, 0n];

        for (const s of [1n, -1n]) {
            for (const t of [-3n, -1n, 0n, 2n, 5n]) {
                // L(u) = s*u + t, with inverse L^{-1}(u) = s*u - s*t since s = +/-1.
                const g = bChangeVariablesLinear(g0, s, -s * t);
                const h = bCompose([s, t], h0);
                const p = bCompose(g, h);

                const factors = bRittDecompose(p);
                expect(factors.length).toBeGreaterThanOrEqual(2);
                expect(bEqual(bRittRecompose(factors), p)).toEqual(true);
            }
        }
    });
});
