import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bCompose } from '../../../src/composition/bigint/b-compose.js';
import { bDecomposePowerSubstitution } from '../../../src/composition/bigint/b-decompose-power-substitution.js';


describe('bDecomposePowerSubstitution', function() {
    it('should decompose p(x) = f(x^2)', function() {
        // p(x) = x^4 + 2x^2 + 1
        const p = [1n, 0n, 2n, 0n, 1n];

        const r = bDecomposePowerSubstitution(p);
        expect(r).toBeDefined();

        if (r) {
            expect(r.k).toEqual(2);
            expect(bEqual(r.f, [1n, 2n, 1n])).toEqual(true);
            expect(bEqual(r.g, [1n, 0n, 0n])).toEqual(true);
            expect(bEqual(bCompose(r.f, r.g), p)).toEqual(true);
        }
    });

    it('should decompose p(x) = f(x^3)', function() {
        // p(x) = 3x^6 - 5x^3 + 2
        const p = [3n, 0n, 0n, -5n, 0n, 0n, 2n];

        const r = bDecomposePowerSubstitution(p);
        expect(r).toBeDefined();

        if (r) {
            expect(r.k).toEqual(3);
            expect(bEqual(r.f, [3n, -5n, 2n])).toEqual(true);
            expect(bEqual(r.g, [1n, 0n, 0n, 0n])).toEqual(true);
            expect(bEqual(bCompose(r.f, r.g), p)).toEqual(true);
        }
    });

    it('should return undefined when no nontrivial x^k substitution exists', function() {
        const p = [1n, 0n, 1n, 1n]; // x^3 + x + 1
        expect(bDecomposePowerSubstitution(p)).toBeUndefined();
    });

    it('should return undefined for constant or empty polynomials', function() {
        expect(bDecomposePowerSubstitution([7n])).toBeUndefined();
        expect(bDecomposePowerSubstitution([])).toBeUndefined();
    });
});
