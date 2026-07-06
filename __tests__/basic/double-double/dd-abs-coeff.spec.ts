import { describe, expect, it } from '@jest/globals';
import { ddAbsCoeff } from '../../../src/basic/double-double/dd-abs-coeff.js';


describe('ddAbsCoeff', function() {
    it('should return empty for an empty polynomial', function() {
        expect(ddAbsCoeff([])).toEqual([]);
    });

    it('should take the absolute value of all coefficients', function() {
        const p = [[0, -3], [0, 0], [0, 2], [0, -1]];
        expect(ddAbsCoeff(p)).toEqual([[-0, 3], [0, 0], [0, 2], [-0, 1]]);
    });

    it('should preserve already non-negative coefficients', function() {
        const p = [[0, 1], [0, 4], [0, 9]];
        expect(ddAbsCoeff(p)).toEqual([[0, 1], [0, 4], [0, 9]]);
    });
});
