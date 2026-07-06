import { describe, expect, it } from '@jest/globals';
import { getXY } from './get-xy.js';


describe('getXY', function() {
    it('should return linear power-basis coefficients for 2 control points', function() {
        const ps = [[1, 2], [4, 8]];
        expect(getXY(ps)).toEqual([[3, 1], [6, 2]]);
    });

    it('should return quadratic power-basis coefficients for 3 control points', function() {
        const ps = [[1, 2], [3, 5], [7, 11]];
        expect(getXY(ps)).toEqual([[2, 4, 1], [3, 6, 2]]);
    });

    it('should return cubic power-basis coefficients for 4 control points', function() {
        const ps = [[0, 0], [1, 2], [3, 4], [6, 8]];
        expect(getXY(ps)).toEqual([[0, 3, 3, 0], [2, 0, 6, 0]]);
    });

    it('should handle negative and mixed coordinates', function() {
        const ps = [[-2, 5], [-1, -3], [4, 2]];
        expect(getXY(ps)).toEqual([[4, 2, -2], [13, -16, 5]]);
    });

    it('should throw for unsupported control-point counts', function() {
        expect(() => getXY([])).toThrow('must be of length 2, 3 or 4');
        expect(() => getXY([[0, 0]])).toThrow('must be of length 2, 3 or 4');
        expect(() => getXY([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]])).toThrow('must be of length 2, 3 or 4');
    });
});
