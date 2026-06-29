import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatCoefficientsArr } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatCoefficientsArr', function() {
    it('should predictably generate an array of polynomials with coefficients in a flat random distribution', 
    function() {
        let res: bigint[][];
        let expected1 = [23476909n, -27312416n, 125838304n];
        let expected2 = [4453383n, -7934801n, 3372311n];
        
        res = bFlatCoefficientsArr(2,3,-2,2);
        
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);
        
        res = bFlatCoefficientsArr(2,3,-2,2);
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);

        let expected3 = [
            [291912365n, 241123040n, 394273760n, 410943712n, 14521824n],
              [11760919n, 15009599n, 5934375n, 4776143n, 15289399n]
        ];
        res = bFlatCoefficientsArr(2,5);
        expect(bEqual(res[0], expected3[0])).toEqual(true);
        expect(bEqual(res[1], expected3[1])).toEqual(true);
    });
});