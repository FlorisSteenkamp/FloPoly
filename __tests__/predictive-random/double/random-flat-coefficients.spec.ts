import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatCoefficients } from '../../../src/predictive-random/double/random.js';


describe('random.flatCoefficients', function() {
    it('should predictably generate a polynomial with coefficients in a flat random distribution', 
    function() {
        let res: { p: number[]; seed: number; };
        let expected: number[];
        let expectedSeed = 3658815999;
        
        res = flatCoefficients(3,-5,5);
        expected = [0.43729151133447886, -1.09116829931736, 3.099136590026319];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
        
        res = flatCoefficients(3,-5,5); 
        expected = [0.43729151133447886, -1.09116829931736, 3.099136590026319];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
        
        res = flatCoefficients(3); // Uses default range (now [0,1] as documented)
        expected = [0.5437291511334479, 0.390883170068264, 0.8099136590026319];
        expect(equal(res.p, expected)).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
    });
});
