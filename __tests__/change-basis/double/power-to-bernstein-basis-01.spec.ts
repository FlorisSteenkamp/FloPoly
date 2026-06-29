import { describe, expect, it } from '@jest/globals';
import { powerToBernsteinBasis01 } from '../../../src/change-basis/double/power-to-bernstein-basis-01.js';
import { bernsteinToPowerBasis01 } from '../../../src/change-basis/double/bernstein-to-power-basis-01.js';


describe('powerToBernsteinBasis', function() {
    it('should convert power basis coefficients to Bernstein basis coefficients',
    function() {
        expect(powerToBernsteinBasis01([])).toEqual([]);
        expect(powerToBernsteinBasis01([7])).toEqual([7]);
        expect(powerToBernsteinBasis01([1,0])).toEqual([0,1]);
        expect(powerToBernsteinBasis01([1,0,0])).toEqual([0,0,1]);
        expect(powerToBernsteinBasis01([1,0,0,0])).toEqual([0,0,0,1]);
        expect(powerToBernsteinBasis01([1,0,0,0,0])).toEqual([0,0,0,0,1]);
        expect(powerToBernsteinBasis01([5,4,3,2,1])).toEqual([1,1.5,2.5,5,15]);
    });

    it('should round-trip power basis to Bernstein basis coefficients',
    function() {
        const testCases = [
            [1,0],
            [1,0,0],
            [1,0,0,0],
            [1,0,0,0,0],
            [5,4,3,2,1]
        ];

        for (const p of testCases) {
            const b = powerToBernsteinBasis01(p);
            const p2 = bernsteinToPowerBasis01(b);
            expect(p2).toEqual(p);
        }
    });
});
