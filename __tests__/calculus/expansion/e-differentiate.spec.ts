import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eDifferentiate } from '../../../src/calculus/expansion/e-differentiate.js';


describe('eDifferentiate', function() {
    it('should differentiate some polynomials with Shewchuk expansion coefficients correctly', 
    function() {
        let p1: number[][] = [];
        let p2 = [[1]];
        let p3 = [[5], [4], [3], [2], [1]];
        expect(eEqual(eDifferentiate(p1), [])).toEqual(true);
        expect(eEqual(eDifferentiate(p2), [])).toEqual(true);
        expect(eEqual(eDifferentiate(p3), [[20], [12], [6], [2]])).toEqual(true);
    });
});