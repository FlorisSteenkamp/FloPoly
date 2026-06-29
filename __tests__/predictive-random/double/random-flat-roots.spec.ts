import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatRoots } from '../../../src/predictive-random/double/random.js';


describe('random.flatRoots', function() {
    it('should predictably generate a polynomial with Roots in a flat random distribution', 
    function() {
        let res: { p: number[], seed: number };
        
        res = flatRoots(3,0,10); 
        expect(equal(res.p, [1, -17.27247918024659, 97.33487287168995, -179.34094494147305])).toEqual(true);
        expect(res.seed).toEqual(939629312);
        
        res = flatRoots(3,0,10); 
        expect(equal(res.p, [1, -17.27247918024659, 97.33487287168995, -179.34094494147305])).toEqual(true);
        expect(res.seed).toEqual(939629312);
        
        res = flatRoots(3); // Uses defaults for range
        expect(equal(res.p, [1, -1.7272479180246592, 0.9733487287168996, -0.17934094494147307])).toEqual(true);
        expect(res.seed).toEqual(939629312);
    });
});