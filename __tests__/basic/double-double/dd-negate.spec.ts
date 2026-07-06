import { describe, expect, it } from '@jest/globals';
import { ddNegate } from '../../../src/basic/double-double/dd-negate.js';


describe('ddNegate', function() {
    it('should return empty for an empty polynomial', function() {
        expect(ddNegate([])).toEqual([]);
    });

    it('should negate all coefficients', function() {
        const p = [[1e-30, 3], [-2e-30, -4], [5e-31, 2]];
        expect(ddNegate(p)).toEqual([[-1e-30, -3], [2e-30, 4], [-5e-31, -2]]);
    });

    it('should be an involution (negating twice returns original)', function() {
        const p = [[3e-31, -7], [-4e-31, 5], [2e-31, -1]];
        expect(ddNegate(ddNegate(p))).toEqual(p);
    });

    it('should not mutate the input polynomial', function() {
        const p = [[1e-30, 2], [0, -3]];
        const original = p.map(c => [...c]);

        ddNegate(p);

        expect(p).toEqual(original);
    });
});
