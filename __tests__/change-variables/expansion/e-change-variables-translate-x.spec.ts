import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eChangeVariablesTranslateX } from '../../../src/change-variables/expansion/e-taylor-shift.js';


describe('eChangeVariablesTranslateX', function() {
    it('should correctly perform the change of variables p(x) <- p(x + b) for some polynomials with Shewchuk expansion coefficients', 
    function() {
        let p1: number[][] = [];
        let p2 = [[1],[2],[7]];
        expect(eEqual(eChangeVariablesTranslateX(p1, 3), [])).toEqual(true);
        expect(eEqual(eChangeVariablesTranslateX(p2, 3), [[1],[8],[22]])).toEqual(true);
    });
});