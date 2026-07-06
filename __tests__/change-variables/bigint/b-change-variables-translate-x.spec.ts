import { describe, expect, it } from '@jest/globals';
import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bChangeVariablesTranslateX } from '../../../src/change-variables/bigint/b-taylor-shift.js';


describe('bChangeVariablesTranslateX', function() {
    it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with bigint coefficients', 
    function() {
        let p1: bigint[] = [];
        let p2 = [1n,2n,7n];
        expect(bEqual(bChangeVariablesTranslateX(p1, 3n), [])).toEqual(true);
        expect(bEqual(bChangeVariablesTranslateX(p2, 3n), [1n,8n,22n])).toEqual(true);
    });
});