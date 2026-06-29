import { describe, expect, it } from '@jest/globals';
import { ddDegree } from '../../../src/basic/double-double/dd-degree.js';


describe('ddDegree', function() {
    it('should return the polynomial degree for non-empty polynomials', function() {
        expect(ddDegree([[0,5], [0,-3], [0,0]])).toBe(2);
        expect(ddDegree([[0,1]])).toBe(0);
    });

    it('should return -1 for the zero polynomial representation []', function() {
        expect(ddDegree([])).toBe(-1);
    });
});
