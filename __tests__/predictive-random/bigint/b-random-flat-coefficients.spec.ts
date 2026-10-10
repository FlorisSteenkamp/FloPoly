import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatCoefficients } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatCoefficients', function() {
    it('should predictably generate a polynomial with coefficients in a flat random distribution', 
    function() {
        let res: { p: bigint[]; seed: number; };
        
        res = bFlatCoefficients(3,-5,5); 
        expect(bEqual(res.p, [469538185n, -1171633040n, 3327672575n])).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
        
        res = bFlatCoefficients(3,-5,5); 
        expect(bEqual(res.p, [469538185n, -1171633040n, 3327672575n])).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
        
        res = bFlatCoefficients(3); // Uses default range 
        expect(bEqual(res.p, [1167649461n, 839415216n, 1739276339n])).toEqual(true);
        expect(res.seed === 3658815999).toEqual(true);
    });
});
