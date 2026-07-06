import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bCompose } from '../../../src/composition/bigint/b-compose.js';


describe('bCompose', function() {
    it('should compose a quadratic with a linear polynomial', function() {
        const p = [1n, 2n, 3n];
        const q = [2n, 1n];

        expect(bEqual(bCompose(p, q), [4n, 8n, 6n])).toEqual(true);
    });

    it('should return [] for empty outer polynomial', function() {
        expect(bEqual(bCompose([], [1n, 2n]), [])).toEqual(true);
    });

    it('should handle constant inner polynomial', function() {
        const p = [1n, 2n, 3n];
        expect(bEqual(bCompose(p, [5n]), [38n])).toEqual(true);
    });

    it('should return p(0) when inner polynomial is zero', function() {
        const p = [7n, -1n, 4n];
        expect(bEqual(bCompose(p, []), [4n])).toEqual(true);
    });
});
