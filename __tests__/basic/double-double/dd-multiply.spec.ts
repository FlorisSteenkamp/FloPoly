import { describe, expect, it } from '@jest/globals';
import { ddMultiply } from '../../../src/basic/double-double/dd-multiply.js';


describe('ddMultiply', function() {
    it('should multiply two polynomials correctly', function() {
        const p1 = [[0,1], [0,2], [0,3]];
        const p2 = [[0,2], [0,5], [0,3], [0,5]];
        expect(ddMultiply(p1, p2)).toEqual([[0,2], [0,9], [0,19], [0,26], [0,19], [0,15]]);
    });

    it('should return empty if either polynomial is empty', function() {
        expect(ddMultiply([], [[0,1]])).toEqual([]);
        expect(ddMultiply([[0,1]], [])).toEqual([]);
    });
});
