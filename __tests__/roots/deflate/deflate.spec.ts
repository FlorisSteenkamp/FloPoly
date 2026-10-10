import { describe, expect, it } from '@jest/globals';
import { deflate } from '../../../src/roots/deflate/deflate.js';
import { ddDeflate } from '../../../src/roots/deflate/dd-deflate.js';
import { eDeflate } from '../../../src/roots/deflate/e-deflate.js';
import { bDeflate } from '../../../src/roots/deflate/b-deflate.js';


describe('deflate (all variants)', function() {
    it('should deflate a root', function() {
        // x^3 - 5x^2 + 8x - 4 = (x - 1)(x - 2)^2
        expect(deflate([1, -5, 8, -4], 2)).toEqual([1, -3, 2]);
        expect(deflate([1, -3, 2], 2)).toEqual([1, -1]);
        expect(deflate([1, -1], 1)).toEqual([1]);
        expect(ddDeflate([[0,1], [0,-5], [0,8], [0,-4]], 2)).toEqual([[0,1], [0,-3], [0,2]]);
        expect(ddDeflate([[0,1], [0,-3], [0,2]], 2)).toEqual([[0,1], [0,-1]]);
        expect(ddDeflate([[0,1], [0,-1]], 1)).toEqual([[0,1]]);
        expect(eDeflate([[1], [-5], [8], [-4]], 2)).toEqual([[1], [-3], [2]]);
        expect(bDeflate([1n, -5n, 8n, -4n], 2n)).toEqual([1n, -3n, 2n]);
    });

    it('should return the zero polynomial for constant and zero polynomials', function() {
        // Regression: `deflate([], r)` previously returned `[undefined]`
        expect(deflate([], 2)).toEqual([]);
        expect(deflate([5], 2)).toEqual([]);
        expect(ddDeflate([], 2)).toEqual([]);
        expect(ddDeflate([[0,5]], 2)).toEqual([]);
        expect(eDeflate([], 2)).toEqual([]);
        expect(eDeflate([[5]], 2)).toEqual([]);
        expect(bDeflate([], 2n)).toEqual([]);
        expect(bDeflate([5n], 2n)).toEqual([]);
    });
});
