import { describe, expect, it } from '@jest/globals';

import { AbsHorner } from '../../../src/evaluate/double/abs-horner.js';

// see also the file: e-e-horner.spec.ts

describe('AbsHorner', function() {
    it('should evaluate some polynomials (with all coefficients taken as their absolute value) correctly at some values',
    function() {
        let p1 = [-0.1,0.2,0.3,2,3,5,11.11];
        let p2 = [0.1,-0.2,-0.3,-2,-3,5,0];
        
        expect(AbsHorner(p1,3)).toEqual(252.91000000000003);
        expect(AbsHorner(p2,2.2)).toEqual(75.4889344);
        expect(AbsHorner(p1,1.002)).toEqual(21.749657257644827);
        expect(AbsHorner(p2,1212)).toEqual(317491919306866370);
    });
});