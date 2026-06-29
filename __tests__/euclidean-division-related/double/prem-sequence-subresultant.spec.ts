import { describe, expect, it } from '@jest/globals';

import { premSequenceSubresultant } from '../../../src/euclidean-division-related/double/prem-sequence-subresultant.js';


describe('premSequenceSubresultant', function() {
    it('should correctly calculate the subsresultant pseudo remainder sequence of two polynomials with double precision coefficients', 
    function() {
        {
            // This is the Wikipedia (and paper) example
            let a = [1, 0, 1, 0, -3, -3, 8, 2, -5];
            let b = [3, 0, 5, 0, -4, -9, 21];
            let seq = premSequenceSubresultant(a,b);
            expect(seq).toEqual([
                [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]],
                [[3], [0], [5], [0], [-4], [-9], [21]],
                [[15], [-0], [-3], [-0], [9]],
                [[65], [125], [-245]],
                [[9326], [-12300]],
                [[260708]]
            ]);
        }
    });
});
