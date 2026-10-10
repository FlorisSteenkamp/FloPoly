import { describe, expect, it } from '@jest/globals';
import { scaleWithInpErr, inplaceScaleWithInpErr } from '../../src/change-variables/double/scale-with-inp-err.js';
import { ddScaleWithInpErr, ddInplaceScaleWithInpErr } from '../../src/change-variables/double-double/dd-scale-with-inp-err.js';
import { scale } from '../../src/change-variables/double/scale.js';
import { eScale } from '../../src/change-variables/expansion/e-scale.js';
import { eEstimate } from 'big-float-ts';
import { γ1, γγ3 } from '../../src/error-analysis/gamma.js';

const { abs } = Math;


describe('scaleWithInpErr / ddScaleWithInpErr with negative scale factors', function() {
    const p = [1.1, -2.2, 3.3, -4.4, 5.5];
    const p_ = [0.1, 0.1, 0.1, 0.1, 0.1];

    it('should return non-negative error bounds that contain the exact result', function() {
        // Regression: a negative `s` previously gave meaningless (possibly
        // negative) error bounds
        for (const s of [-3, -0.1, -1.7, 2.5]) {
            const [r, r_] = scaleWithInpErr(p, s, p_);
            expect(r).toEqual(scale(p, s));
            const exact = eScale(p.map(c => [c]), s).map(eEstimate);
            for (let i=0; i<r.length; i++) {
                expect(r_[i] >= 0).toBe(true);
                // the error bound (scaled by γ1) must cover the round-off
                // (the input error term is additional)
                expect(abs(r[i] - exact[i]) <= r_[i]*γ1).toBe(true);
            }
            const rI = p.slice(); const rI_ = p_.slice();
            inplaceScaleWithInpErr(rI, s, rI_);
            expect(rI).toEqual(r);
            expect(rI_).toEqual(r_);
        }
    });

    it('should do the same in double-double precision', function() {
        const pDd = p.map(c => [0, c]);
        for (const s of [-3, -0.1, -1.7, 2.5]) {
            const [r, r_] = ddScaleWithInpErr(pDd, s, p_);
            const exact = eScale(p.map(c => [c]), s).map(eEstimate);
            for (let i=0; i<r.length; i++) {
                expect(r_[i] >= 0).toBe(true);
                expect(abs(r[i][1] + r[i][0] - exact[i]) <= r_[i]*γγ3 + abs(exact[i])*2**-52).toBe(true);
            }
            const rI = pDd.slice(); const rI_ = p_.slice();
            ddInplaceScaleWithInpErr(rI, s, rI_);
            expect(rI).toEqual(r);
            expect(rI_).toEqual(r_);
        }
    });
});
