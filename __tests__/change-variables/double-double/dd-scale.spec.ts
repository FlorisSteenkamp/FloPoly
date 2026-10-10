import { describe, expect, it } from '@jest/globals';
import { ddScale, inplaceDdScale } from '../../../src/change-variables/double-double/dd-scale.js';
import { ddScaleWithInpErr } from '../../../src/change-variables/double-double/dd-scale-with-inp-err.js';


describe('ddScale / inplaceDdScale', function() {
    it('should scale the coefficients by powers of s', function() {
        expect(ddScale([[0,1], [0,2], [0,7]], 3)).toEqual([[0,9], [0,6], [0,7]]);
        expect(ddScale([], 3)).toEqual([]);
        expect(ddScale([[0,5]], 3)).toEqual([[0,5]]);
        const p = [[0,1], [0,2], [0,7]];
        inplaceDdScale(p, 2);
        expect(p).toEqual([[0,4], [0,4], [0,7]]);
    });

    it('should keep the powers of s in double-double precision', function() {
        // Regression: `sPow *= s` was computed in plain double precision
        const p = Array.from({ length: 21 }, () => [0, 1]);
        const r = ddScale(p, 0.1);
        const [rWithErr] = ddScaleWithInpErr(p, 0.1, p.map(() => 0));
        expect(r).toEqual(rWithErr);
        expect(r[0][0] !== 0).toBe(true);  // the low part is not lost
    });
});
