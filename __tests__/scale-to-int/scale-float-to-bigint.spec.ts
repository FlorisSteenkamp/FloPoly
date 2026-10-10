import { describe, expect, it } from '@jest/globals';

import { scaleFloatToBigint } from '../../src/scale-to-int/scale-float-to-bigint.js';


describe('scaleFloatToBigint', function() {
    it('should scale the given float to a bigint', 
    function() {
        let p = 0.000000000000000004;
        let res = scaleFloatToBigint(p);
        expect(res === 1298074214633707n).toEqual(true);

        let p2 = 0;
        let res2 = scaleFloatToBigint(p2);
        expect(res2 === 0n).toEqual(true);
    });

    it('should handle subnormal numbers and large scale powers',
    function() {
        // Regression: previously threw for subnormals
        expect(scaleFloatToBigint(5e-324)).toEqual(1n);
        expect(scaleFloatToBigint(-3*5e-324)).toEqual(-3n);
        expect(scaleFloatToBigint(2**-1022 + 5e-324)).toEqual(2n**52n + 1n);
        expect(scaleFloatToBigint(Number.MAX_VALUE)).toEqual(2n**53n - 1n);
    });
});