import { describe, expect, it } from '@jest/globals';


import { scaleFloatssToIntss } from '../../src/scale-to-int/scale-floatss-to-intss.js';


describe('scaleFloatssToIntss', function() {
    it('should scale the given array of array of floats to double precision integer values', 
    function() {
        let p = [[0.000000000000000001, 324345345345341.1],[2],[3]];
        let res = scaleFloatssToIntss(p);
        expect(res).toEqual([
            [1298074214633707, 4.210243294292521e+47],
            [2.596148429267414e+33],
            [3.894222643901121e+33]
        ]);

        let p3 = [[0, 2], [0]];
        let res3 = scaleFloatssToIntss(p3);
        expect(res3).toEqual([
            [0, 1], [0]
        ]);
    });
});