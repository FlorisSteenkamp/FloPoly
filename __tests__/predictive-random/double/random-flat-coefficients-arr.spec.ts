import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatCoefficientsArr } from '../../../src/predictive-random/double/random.js';


describe('random.flatCoefficientsArr', function() {
    it('should predictably generate an array of polynomials with coefficients in a flat random distribution', 
    function() {
        let res: number[][];
        
        res = flatCoefficientsArr(2,3,-2,2);
        expect(equal(res[0], [0.1749166026711464, -0.20349335670471191, 0.9375684261322021])).toEqual(true);
        expect(equal(res[1], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693])).toEqual(true);
        
        res = flatCoefficientsArr(2,3,-2,2);
        expect(equal(res[0], [0.1749166026711464, -0.20349335670471191, 0.9375684261322021])).toEqual(true);
        expect(equal(res[1], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693])).toEqual(true);
    });
});