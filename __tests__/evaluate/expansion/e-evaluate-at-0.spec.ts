import { describe, expect, it } from '@jest/globals';

import { eEvaluateAt0 } from '../../../src/evaluate/expansion/e-evaluate-at-0.js';
import { Horner } from '../../../src/evaluate/double/horner.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';


describe('eEvaluateAt0', function() {
    it('should evaluate some polynomials correctly at 0', 
    function() {
        let p1 = [[0.1],[0.2],[0.3],[2],[3],[5],[11.11]];
        let p2 = [[0.1],[0.2],[0.3],[2],[3],[5],[0]];
        let p3: number[][] = [];
        
        expect(eEvaluateAt0(p1)).toEqual([11.11]);
        expect(eEvaluateAt0(p2)).toEqual([0]);
        expect(eEvaluateAt0(p1)).toEqual(eHorner(p1,0));
        expect(eEvaluateAt0(p2)).toEqual(eHorner(p2,0));
        expect(eEvaluateAt0(p3)).toEqual([0]);
    });
});