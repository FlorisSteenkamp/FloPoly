import { describe, expect, it } from '@jest/globals';
import { negativeRootLowerBound_LMQ } from '../../../src/roots/root-bounds/root-bounds-lmq.js';


describe('negativeRootLowerBound_LMQ', function() {
    it('should correctly find bounds of some polynomial roots', 
    function() {
        let p1 = [2,-3,6,5,-130];
        let p2: number[] = [];
        let p3 = [3];
        // real roots at about -2.397918624065303 and 2.8793785310848383
        expect(negativeRootLowerBound_LMQ(p1)).toEqual(-4.015534272870436);
        // real roots everywhere
        expect(negativeRootLowerBound_LMQ(p2) === 0).toBe(true);
        // real roots nowhere
        expect(negativeRootLowerBound_LMQ(p3) === 0).toBe(true);
    });
});