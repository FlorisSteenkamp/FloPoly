import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatCoefficientsArr } from '../../../src/predictive-random/double/random.js';


describe('random.flatCoefficientsArr', function() {
    it('should predictably generate an array of polynomials with coefficients in a flat random distribution', 
    function() {
        let res: number[][];
        
        res = flatCoefficientsArr(2,3,-2,2);
        expect(equal(res[0], [0.17491660453379154, -0.43646731972694397, 1.2396546360105276])).toEqual(true);
        expect(equal(res[1], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066])).toEqual(true);
        
        res = flatCoefficientsArr(2,3,-2,2);
        expect(equal(res[0], [0.17491660453379154, -0.43646731972694397, 1.2396546360105276])).toEqual(true);
        expect(equal(res[1], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066])).toEqual(true);
    });
});