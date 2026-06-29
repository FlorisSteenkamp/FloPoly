import { describe, expect, it } from '@jest/globals';

import { changeVariablesLinear } from '../../src/change-variables/double/change-variables-linear.js';


describe('changeVariables', function() {
    it('should return the correct results for some input parameters', 
    function() {
        let res = changeVariablesLinear([1,2,7], 3, 4); //=> [9, 30, 31]
        expect(res[0]).toEqual(9);
        expect(res[1]).toEqual(30);
        expect(res[2]).toEqual(31);
    });
});