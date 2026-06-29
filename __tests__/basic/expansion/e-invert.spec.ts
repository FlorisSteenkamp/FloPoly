import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eInvert } from '../../../src/basic/expansion/e-invert.js';


describe('eInvert', function() {
    it('should correctly invert some polynomials with Shewchuk expansion coefficients', 
    function() {
        let p1: number[][] = [];
        let p2 = [[1]];
        let p3 = [[4],[3],[2],[1]];
        expect(eEqual(eInvert(p1), [])).toEqual(true);
        expect(eEqual(eInvert(p2), [[1]])).toEqual(true);
        expect(eEqual(eInvert(p3), [[1],[2],[3],[4]])).toEqual(true);
    });
});