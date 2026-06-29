import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { multiply } from '../../../src/basic/double/multiply.js';


describe('multiply', function() {
    it('should correctly multiply some polynomials with double precision coefficients',
    function() {
        let p1 = [2];
        let p2: number[] = [];
        let p3 = [1,2,3];
        let p4 = [4,4,5,6,7];
        expect(equal(multiply(p1,p3), [2,4,6])).toEqual(true);
        expect(equal(multiply(p2,p3), [])).toEqual(true);
        expect(equal(multiply(p3,p4), [4, 12, 25, 28, 34, 32, 21])).toEqual(true);
    });
});