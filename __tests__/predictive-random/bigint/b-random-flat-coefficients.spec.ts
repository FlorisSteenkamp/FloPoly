import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatCoefficients } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatCoefficients', function() {
    it('should predictably generate a polynomial with coefficients in a flat random distribution', 
    function() {
        let res: { p: bigint[]; seed: number; };
        
        res = bFlatCoefficients(3,-5,5); 
        expect(bEqual(res.p, [117384545n, -136562080n, 629191520n])).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
        
        res = bFlatCoefficients(3,-5,5); 
        expect(bEqual(res.p, [117384545n, -136562080n, 629191520n])).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
        
        res = bFlatCoefficients(3); // Uses default range 
        expect(bEqual(res.p, [291912365n, 241123040n, 394273760n])).toEqual(true);
        expect(res.seed === 939629312).toEqual(true);
    });
});
