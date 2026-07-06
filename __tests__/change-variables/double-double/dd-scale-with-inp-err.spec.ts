import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import {
    ddInplaceScaleWithInpErr,
    ddScaleWithInpErr
} from '../../../src/change-variables/double-double/dd-scale-with-inp-err.js';


describe('ddScaleWithInpErr', function() {
    it('should return empty outputs for an empty polynomial', function() {
        expect(ddScaleWithInpErr([], 3, [])).toEqual([[], []]);
    });

    it('should scale coefficients and propagate running input error bounds', function() {
        const p = [[0, 1], [0, 2], [0, 7]];
        const p_ = [0.1, 0.2, 0.7];

        const [r, r_] = ddScaleWithInpErr(p, 3, p_);

        expect(r).toEqual([[0, 9], [0, 6], [0, 7]]);
        expect(equal(r_, [18.9, 6.6, 0.7])).toEqual(true);
    });

    it('should agree with ddInplaceScaleWithInpErr on the same input', function() {
        const p = [[0, 5], [0, -3], [0, 2], [0, 1]];
        const p_ = [0.5, 0.3, 0.2, 0.1];

        const [r, r_] = ddScaleWithInpErr(p, 2, p_);

        const pInplace = p.map(c => [...c]);
        const p_Inplace = [...p_];
        ddInplaceScaleWithInpErr(pInplace, 2, p_Inplace);

        expect(pInplace).toEqual(r);
        expect(equal(p_Inplace, r_)).toEqual(true);
    });
});
