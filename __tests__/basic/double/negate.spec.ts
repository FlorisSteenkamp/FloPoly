import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { negate } from '../../../src/basic/double/negate.js';


describe('negate', function() {
    it('should correctly negate some polynomials with double precision coefficients', 
    function() {
        let p1 = [0.1, -0.2];
        expect(equal(negate(p1), [-0.1, 0.2])).toEqual(true);
    });
});