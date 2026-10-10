import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatRoots } from '../../../src/predictive-random/double/random.js';


describe('random.flatRoots', function() {
    it('should predictably generate a polynomial with Roots in a flat random distribution', 
    function() {
        let res: { p: number[], seed: number };
        
        res = flatRoots(3,0,10); 
        expect(equal(res.p, [1, -17.445259802043438, 96.94898590669898, -172.1346546982741])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
        
        res = flatRoots(3,0,10); 
        expect(equal(res.p, [1, -17.445259802043438, 96.94898590669898, -172.1346546982741])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
        
        res = flatRoots(3); // Uses defaults for range
        expect(equal(res.p, [1, -1.7445259802043438, 0.9694898590669899, -0.1721346546982741])).toEqual(true);
        expect(res.seed).toEqual(3658815999);
    });
});