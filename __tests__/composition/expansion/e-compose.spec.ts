import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eCompose } from '../../../src/composition/expansion/e-compose.js';


describe('eCompose', function() {
    it('should compose a quadratic with a linear polynomial', function() {
        const p = [[1], [2], [3]];
        const q = [[2], [1]];

        expect(eEqual(eCompose(p, q), [[4], [8], [6]])).toEqual(true);
    });

    it('should return [] for empty outer polynomial', function() {
        expect(eEqual(eCompose([], [[1], [2]]), [])).toEqual(true);
    });

    it('should handle constant inner polynomial', function() {
        const p = [[1], [2], [3]];
        expect(eEqual(eCompose(p, [[5]]), [[38]])).toEqual(true);
    });

    it('should return p(0) when inner polynomial is zero', function() {
        const p = [[7], [-1], [4]];
        expect(eEqual(eCompose(p, []), [[4]])).toEqual(true);
    });
});
