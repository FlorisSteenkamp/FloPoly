import { describe, expect, it } from '@jest/globals';


import { scaleFloatsToInts } from '../../src/scale-to-int/scale-floats-to-ints.js';


describe('scaleFloatsToInts', function() {
    it('should scale the given array of floats to double precision integer values', 
    function() {
        let p1 = [0.000000000000000001, 324345345345341.1, 2, 3];
        let res1 = scaleFloatsToInts(p1);
        expect(res1).toEqual([
            1298074214633707, 
            4.210243294292521e+47,
            2.596148429267414e+33,
            3.894222643901121e+33
        ]);

        let p2 = [0];
        let res2 = scaleFloatsToInts(p2);
        expect(res2).toEqual([
            0
        ]);

        let p3 = [0, 2];
        let res3 = scaleFloatsToInts(p3);
        expect(res3).toEqual([
            0, 1
        ]);
    });
});