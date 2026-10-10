import { describe, expect, it } from '@jest/globals';
import { eCompress, eEstimate } from 'big-float-ts';
import { eeTaylorShift } from '../../../src/change-variables/expansion/ee-taylor-shift.js';
import { eTaylorShift } from '../../../src/change-variables/expansion/e-taylor-shift.js';
import { taylorShift } from '../../../src/change-variables/double/taylor-shift.js';


describe('eeTaylorShift', function() {
    it('should agree with eTaylorShift and taylorShift and return compressed expansions', function() {
        const p = [[1], [2], [3], [-4], [5]];
        const r = eeTaylorShift(p, [1.5]);
        expect(r.map(eEstimate)).toEqual(eTaylorShift(p, 1.5).map(eEstimate));
        expect(r.map(eEstimate)).toEqual(taylorShift([1, 2, 3, -4, 5], 1.5));
        // Regression: the expansions were never compressed
        for (const c of r) {
            expect(eCompress(c)).toEqual(c);
        }
        expect(eeTaylorShift([], [1])).toEqual([]);
    });

    it('should keep the expansions short for higher degrees', function() {
        const p = Array.from({ length: 30 }, (_, i) => [i % 2 === 0 ? 1 + i : -(1 + i)]);
        const r = eeTaylorShift(p, [0.1]);
        const maxLen = Math.max(...r.map(c => c.length));
        expect(maxLen).toBeLessThanOrEqual(25);
    });
});
