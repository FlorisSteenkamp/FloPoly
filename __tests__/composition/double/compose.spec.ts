import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { compose } from '../../../src/composition/double/compose.js';


describe('compose', function() {
    it('should compose a quadratic with a linear polynomial', function() {
        const p = [1, 2, 3];
        const q = [2, 1];

        expect(equal(compose(p, q), [4, 8, 6])).toEqual(true);
    });

    it('should return [] for empty outer polynomial', function() {
        expect(equal(compose([], [1, 2]), [])).toEqual(true);
    });

    it('should handle constant inner polynomial', function() {
        const p = [1, 2, 3];
        expect(equal(compose(p, [5]), [38])).toEqual(true);
    });

    it('should return p(0) when inner polynomial is zero', function() {
        const p = [7, -1, 4];
        expect(equal(compose(p, []), [4])).toEqual(true);
    });
});
