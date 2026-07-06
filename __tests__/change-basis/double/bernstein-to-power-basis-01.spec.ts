import { describe, expect, it } from '@jest/globals';
import { bernsteinToPowerBasis } from '../../../src/change-basis/double/bernstein-to-power-basis.js';
import { bernsteinToPowerBasis01 } from '../../../src/change-basis/double/bernstein-to-power-basis-01.js';
import { powerToBernsteinBasis01 } from '../../../src/change-basis/double/power-to-bernstein-basis-01.js';


describe('bernsteinToPowerBasis', function() {
    it('should convert Bernstein basis coefficients to power basis coefficients on [0,1]',
    function() {
        expect(bernsteinToPowerBasis([])).toEqual([]);
        expect(bernsteinToPowerBasis([7])).toEqual([7]);
        expect(bernsteinToPowerBasis([0,1])).toEqual([1,0]);
        expect(bernsteinToPowerBasis([0,0,1])).toEqual([1,0,0]);
        expect(bernsteinToPowerBasis([0,0,0,1])).toEqual([1,0,0,0]);
        expect(bernsteinToPowerBasis([0,0,0,0,1])).toEqual([1,0,0,0,0]);
        expect(bernsteinToPowerBasis([1,1.5,2.5,5,15])).toEqual([5,4,3,2,1]);
    });

    it('should convert Bernstein basis coefficients to power basis coefficients on a given interval',
    function() {
        expect(bernsteinToPowerBasis([7], 2, 5)).toEqual([7]);
        expect(bernsteinToPowerBasis([0,1], 2, 5)).toEqual([1/3,-2/3]);
        expect(bernsteinToPowerBasis([0,0,1], 2, 5)).toEqual([1/9,-4/9,4/9]);
    });

    it('should match the [0,1] implementation by default',
    function() {
        const testCases = [
            [],
            [7],
            [0,1],
            [0,0,1],
            [0,0,0,1],
            [0,0,0,0,1],
            [1,1.5,2.5,5,15]
        ];

        for (const b of testCases) {
            expect(bernsteinToPowerBasis(b)).toEqual(bernsteinToPowerBasis01(b));
        }
    });

    it('should round-trip Bernstein basis to power basis coefficients',
    function() {
        const testCases = [
            [7],
            [0,1],
            [0,0,1],
            [0,0,0,1],
            [0,0,0,0,1],
            [1,1.5,2.5,5,15]
        ];

        for (const b of testCases) {
            const p = bernsteinToPowerBasis(b);
            const b2 = powerToBernsteinBasis01(p);
            expect(b2).toEqual(b);
        }
    });

    // it('should throw for a degenerate interval',
    // function() {
    //     expect(() => bernsteinToPowerBasis([0,1], 3, 3)).toThrow(
    //         'The interval endpoints lb and ub must be distinct.'
    //     );
    // });
});
