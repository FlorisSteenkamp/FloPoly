import { describe, expect, it } from '@jest/globals';
import { getControlPointBox } from './get-control-point-box.js';


describe('getControlPointBox', function() {
    it('should return the tight box for mixed-sign control points', function() {
        const ps = [[2, -1], [-3, 4], [1, 0], [0, 5]];
        expect(getControlPointBox(ps)).toEqual([[-3, -1], [2, 5]]);
    });

    it('should handle a single-point curve', function() {
        const ps = [[7, -9]];
        expect(getControlPointBox(ps)).toEqual([[7, -9], [7, -9]]);
    });

    it('should handle repeated points', function() {
        const ps = [[1, 1], [1, 1], [1, 1], [1, 1]];
        expect(getControlPointBox(ps)).toEqual([[1, 1], [1, 1]]);
    });

    it('should handle axis-aligned spread', function() {
        const ps = [[-2, 3], [4, 3], [1, -5], [0, 2]];
        expect(getControlPointBox(ps)).toEqual([[-2, -5], [4, 3]]);
    });

    it('should preserve infinities if present in inputs', function() {
        const ps = [[Number.NEGATIVE_INFINITY, 0], [5, Number.POSITIVE_INFINITY]];
        expect(getControlPointBox(ps)).toEqual([[Number.NEGATIVE_INFINITY, 0], [5, Number.POSITIVE_INFINITY]]);
    });
});
