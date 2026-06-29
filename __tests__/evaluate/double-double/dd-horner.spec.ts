import { describe, expect, it } from '@jest/globals';
import { ddHorner } from '../../../src/evaluate/double-double/dd-horner.js';

// see also the file: e-e-horner.spec.ts


describe('`ddHorner`', function() {
    it('should evaluate some polynomials correctly at some values', 
    function() {
        let p1 = [[0,0.1],[0,0.2],[0,0.3],[0,2],[0,3],[0,5],[0,11.11]];
        let p2 = [[0,0.1],[0,0.2],[0,0.3],[0,2],[0,3],[0,5],[0,0]];
        
        expect(ddHorner(p1,3)).toEqual([8.68749516769185e-15, 252.91]);
        expect(ddHorner(p2,2.2)).toEqual([1.947661942836023e-15, 75.48893440000002]);
        expect(ddHorner(p1,1.002)).toEqual([1.3631433902643734e-15, 21.749657257644824]);
        expect(ddHorner(p2,1212)).toEqual([7.224281858557887, 317491919306866300]);
    });
});