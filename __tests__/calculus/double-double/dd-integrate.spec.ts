import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { ddIntegrate } from '../../../src/calculus/double-double/dd-integrate.js';


describe('ddIntegrate', function() {
    it('should integrate some polynomials with double-double precision coefficients correctly', 
    function() {
        let p1: number[][] = [];
        let p3 = [[0,3], [0,2], [0,1]];
        ddIntegrate(p1, [0,99])//?
        expect(eEqual(ddIntegrate(p1, [0,99]), [[0,99]])).toEqual(true);
        expect(eEqual(ddIntegrate(p3, [0,99]), [[0,1], [0,1], [0,1], [0,99]])).toEqual(true);
    });
});
