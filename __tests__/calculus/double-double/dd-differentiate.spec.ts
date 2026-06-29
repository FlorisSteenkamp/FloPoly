import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { ddDifferentiate } from '../../../src/calculus/double-double/dd-differentiate.js';


describe('ddDifferentiate', function() {
    it('should differentiate some polynomials with double-double precision coefficients correctly', 
    function() {
        let p1: number[][] = [];
        let p2 = [[0,1]];
        let p3 = [[0,5], [0,4], [0,3], [0,2], [0,1]];
        expect(eEqual(ddDifferentiate(p1), [])).toEqual(true);
        expect(eEqual(ddDifferentiate(p2), [])).toEqual(true);
        expect(eEqual(ddDifferentiate(p3), [[0,20], [0,12], [0,6], [0,2]])).toEqual(true);
    });
});