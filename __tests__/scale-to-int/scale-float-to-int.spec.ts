import { describe, expect, it } from '@jest/globals';


import { scaleFloatToInt } from '../../src/scale-to-int/scale-float-to-int.js';


describe('scaleFloatToInt', function() {
    it('should scale the given float to a double precision integer value', 
    function() {
        let p1 = 0.000000000000000001;
        let res1 = scaleFloatToInt(p1);
        expect(res1).toEqual(1298074214633707);

        let p2 = 0;
        let res2 = scaleFloatToInt(p2);
        expect(res2).toEqual(0);
    });

    it('should handle subnormal numbers and large scale powers',
    function() {
        // Regression: previously wrong for subnormals and overflowed for
        // scale powers > 1023
        expect(scaleFloatToInt(5e-324)).toEqual(1);
        expect(scaleFloatToInt(-5e-324)).toEqual(-1);
        expect(scaleFloatToInt(3*5e-324)).toEqual(3);
        expect(scaleFloatToInt(2**-1022)).toEqual(1);
        expect(scaleFloatToInt(2**-1022 + 5e-324)).toEqual(2**52 + 1);
        expect(scaleFloatToInt(2**-1070)).toEqual(1);
        expect(scaleFloatToInt(1.5*2**-1070)).toEqual(3);
        expect(scaleFloatToInt(Number.MAX_VALUE)).toEqual(2**53 - 1);
    });
});