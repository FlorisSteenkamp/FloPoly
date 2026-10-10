import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatCoefficientsArr } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatCoefficientsArr', function() {
    it('should predictably generate an array of polynomials with coefficients in a flat random distribution', 
    function() {
        let res: bigint[][];
        let expected1 = [93907637n, -234326608n, 665534515n];
        let expected2 = [904167166n, -312321839n, 787781228n];
        
        res = bFlatCoefficientsArr(2,3,-2,2);
        
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);
        
        res = bFlatCoefficientsArr(2,3,-2,2);
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);

        let expected3 = [
            [1167649461n, 839415216n, 1739276339n, 1977908990n, 761419985n],
              [1861523052n, 1510199951n, 1706371578n, 1491495789n, 1498335144n]
        ];
        res = bFlatCoefficientsArr(2,5);
        expect(bEqual(res[0], expected3[0])).toEqual(true);
        expect(bEqual(res[1], expected3[1])).toEqual(true);
    });
});