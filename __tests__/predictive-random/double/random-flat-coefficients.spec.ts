import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatCoefficients } from '../../../src/predictive-random/double/random.js';


describe('random.flatCoefficients', function() {
    it('should predictably generate a polynomial with coefficients in a flat random distribution', 
    function() {
        let res: { p: number[]; seed: number; };
        let expected: number[];
        let expectedSeed = 939629312;
        
        res = flatCoefficients(3,-5,5);
        expected = [0.437291506677866, -0.5087333917617798, 2.3439210653305054];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
        
        res = flatCoefficients(3,-5,5); 
        expected = [0.437291506677866, -0.5087333917617798, 2.3439210653305054];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
        
        res = flatCoefficients(3); // Uses default range 
        expected = [0.0874583013355732, -0.10174667835235596, 0.4687842130661011];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
    });
});
