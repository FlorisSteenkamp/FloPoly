import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { changeVariablesScale } from '../../../src/change-variables/double/scale.js';


describe('changeVariablesScale', function() {
    it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with double precision coefficients', 
    function() {
        let p1: number[] = [];
        let p2 = [1,2,7];
        expect(equal(changeVariablesScale(p1, 3), [])).toEqual(true);
        expect(equal(changeVariablesScale(p2, 3), [9,6,7])).toEqual(true);
    });
});