import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bChangeVariablesScale } from '../../../src/change-variables/bigint/b-change-variables-scale.js';


describe('bChangeVariablesScale', function() {
    it('should correctly perform the change of variables p(x) <- p(ax) for some polynomials with bigint coefficients', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n,2n,7n];
        expect(bEqual(bChangeVariablesScale(p1, 3n), [])).toEqual(true);
        expect(bEqual(bChangeVariablesScale(p2, 3n), [9n,6n,7n])).toEqual(true);
    });
});