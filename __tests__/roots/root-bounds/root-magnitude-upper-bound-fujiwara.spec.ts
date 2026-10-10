import { describe, expect, it } from '@jest/globals';
import { rootMagnitudeUpperBound_fujiwara } from '../../../src/roots/root-bounds/fujiwara/root-magnitude-upper-bound-fujiwara.js';


describe('rootMagnitudeUpperBound_fujiwara', function() {
    it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
    function() {
        let p1 = [2,-3,6,5,-130];
        let p2: number[] = [];
        let p3 = [3];
        // real roots at about -2.397918624065303 and 2.8793785310848383
        expect(rootMagnitudeUpperBound_fujiwara(p1)).toEqual(4.7753019278348);
        // real roots everywhere
        expect(rootMagnitudeUpperBound_fujiwara(p2)).toEqual(0);
        // real roots nowhere
        expect(rootMagnitudeUpperBound_fujiwara(p3)).toEqual(0);
    });

    it('should return a valid bound when the leading coefficient magnitude is not 1',
    function() {
        // Regression: `abs(p[d] / 2*an)` was computed instead of
        // `abs(p[d] / (2*an))` which gave an invalid bound for `|an| < 1`
        expect(rootMagnitudeUpperBound_fujiwara([0.5, 0, -8])).toEqual(5.656854249492381);  // roots ±4
        expect(rootMagnitudeUpperBound_fujiwara([0.5, 0, -8])).toBeGreaterThanOrEqual(4);
        expect(rootMagnitudeUpperBound_fujiwara([-2, 0, 8])).toBeGreaterThanOrEqual(2);    // roots ±2
        expect(rootMagnitudeUpperBound_fujiwara([0.25, -1])).toBeGreaterThanOrEqual(4);    // root 4
    });
});