import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eDeflate } from '../../../src/roots/deflate/e-deflate.js';


describe('eDeflate', function() {
    it('should correctly deflate some polynomials with expansion coefficients', function() {
        {
            const p = [[1], [-5], [8], [-4]];
            const r = 2;
            expect(eEqual(eDeflate(p, r), [[1], [-3], [2]])).toEqual(true);
        }
        {
            const p = [[1], [-3], [2]];
            const r = 2;
            expect(eEqual(eDeflate(p, r), [[1], [-1]])).toEqual(true);
        }
        {
            const p = [[1], [-1]];
            const r = 1;
            expect(eEqual(eDeflate(p, r), [[1]])).toEqual(true);
        }
    });
});
