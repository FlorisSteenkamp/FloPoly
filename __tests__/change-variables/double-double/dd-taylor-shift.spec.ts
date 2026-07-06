import { describe, expect, it } from '@jest/globals';
import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { ddTaylorShift } from '../../../src/change-variables/double-double/dd-taylor-shift.js';


describe('ddTaylorShift', function() {
    it('should compute Taylor shifts for some double-double polynomials', function() {
        {
            const p: number[][] = [];
            expect(eEqual(ddTaylorShift(p, 3), [])).toEqual(true);
        }
        {
            const p = [[0, 1], [0, 2], [0, 7]];
            expect(eEqual(ddTaylorShift(p, 3), [[0, 1], [0, 8], [0, 22]])).toEqual(true);
        }
        {
            const p = [[0, 1], [0, -3], [0, 2]];
            expect(eEqual(ddTaylorShift(p, 2), [[0, 1], [0, 1], [0, 0]])).toEqual(true);
        }
    });
});
