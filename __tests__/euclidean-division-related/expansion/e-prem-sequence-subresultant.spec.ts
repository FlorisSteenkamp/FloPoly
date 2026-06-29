import { describe, expect, it } from '@jest/globals';

import { ePremSequenceSubresultant } from '../../../src/euclidean-division-related/expansion/e-prem-sequence-subresultant.js';
import { multiply } from '../../../src/basic/double/multiply.js';


describe('ePremSequenceSubresultant', function() {
    it('should correctly calculate the subsresultant pseudo remainder sequence of two polynomials (with Shewchuk expansion coefficients)', 
    function() {
        {
            // This is the Wikipedia (and paper) example
            let a = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            let b = [[3], [0], [5], [0], [-4], [-9], [21]];
            let seq = ePremSequenceSubresultant(a,b,false);
            expect(seq).toEqual([
                [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]],
                [[3], [0], [5], [0], [-4], [-9], [21]],
                [[15], [-0], [-3], [-0], [9]],
                [[65], [125], [-245]],
                [[9326], [-12300]],
                [[260708]]
            ]);
        }

        {
            let p1 = [2,-3,6,5,-130];
            let p2 = [3,4,-2];
            let p = multiply(p1,p2);

            let r = ePremSequenceSubresultant(p.map(c => [c]), p2.map(c => [c]));

            expect(r).toEqual([
                [[6], [-1], [2], [45], [-382], [-530], [260]],
                [[3], [4], [-2]]
            ]);
        }
    });
});
