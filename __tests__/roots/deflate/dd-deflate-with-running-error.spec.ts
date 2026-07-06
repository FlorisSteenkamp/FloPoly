import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { ddDeflate } from '../../../src/roots/deflate/dd-deflate.js';
import { ddDeflateWithRunningError } from '../../../src/roots/deflate/dd-deflate-with-running-error.js';


describe('ddDeflateWithRunningError', function() {
    it('should return deflated coefficients and running error bounds', function() {
        const p = [[0, 1], [0, -3], [0, 2]];
        const pE = [0, 0, 0];

        const r = ddDeflateWithRunningError(p, pE, 2);

        expect(eEqual(r.coeffs, ddDeflate(p, 2))).toEqual(true);
        expect(r.errBound.length).toEqual(r.coeffs.length);
        expect(r.errBound.every(e => Number.isFinite(e) && e >= 0)).toEqual(true);
        expect(r.errBound.some(e => e > 0)).toEqual(true);
    });

    it('should increase error bounds when input coefficient error increases', function() {
        const p = [[0, 1], [0, -3], [0, 2]];

        const lowErr = ddDeflateWithRunningError(p, [0, 0, 0], 2).errBound;
        const hiErr = ddDeflateWithRunningError(p, [1, 1, 1], 2).errBound;

        expect(lowErr.length).toEqual(hiErr.length);
        for (let i = 0; i < lowErr.length; i++) {
            expect(hiErr[i] >= lowErr[i]).toEqual(true);
        }
    });
});
