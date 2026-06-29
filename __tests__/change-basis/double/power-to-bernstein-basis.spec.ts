import { describe, expect, it } from '@jest/globals';

import { powerToBernsteinBasis } from '../../../src/change-basis/double/power-to-bernstein-basis.js';
import { powerToBernsteinBasis01 } from '../../../src/change-basis/double/power-to-bernstein-basis-01.js';
import { bernsteinToPowerBasis } from '../../../src/change-basis/double/bernstein-to-power-basis.js';


describe('powerToBernsteinBasis', function() {
    it('should convert power basis coefficients to Bernstein basis coefficients on [0,1]',
    function() {
        expect(powerToBernsteinBasis([])).toEqual([]);
        expect(powerToBernsteinBasis([7])).toEqual([7]);
        expect(powerToBernsteinBasis([1,0])).toEqual([0,1]);
        expect(powerToBernsteinBasis([1,0,0])).toEqual([0,0,1]);
        expect(powerToBernsteinBasis([1,0,0,0])).toEqual([0,0,0,1]);
        expect(powerToBernsteinBasis([1,0,0,0,0])).toEqual([0,0,0,0,1]);
        expect(powerToBernsteinBasis([5,4,3,2,1])).toEqual([1,1.5,2.5,5,15]);
    });

    it('should convert power basis coefficients to Bernstein basis coefficients on a given interval',
    function() {
        expect(powerToBernsteinBasis([7], 2, 5)).toEqual([7]);
        // x on [2,5]: q(t)=2+3t => beta_0=2, beta_1=5
        expect(powerToBernsteinBasis([1,0], 2, 5)).toEqual([2,5]);
        // x^2 on [2,5]: q(t)=(2+3t)^2=9t^2+12t+4 => beta=[4, 4+6, 4+12+9]=[4,10,25]
        expect(powerToBernsteinBasis([1,0,0], 2, 5)).toEqual([4, 10, 25]);
    });

    it('should match the [0,1] implementation by default',
    function() {
        const testCases = [
            [],
            [7],
            [1,0],
            [1,0,0],
            [1,0,0,0],
            [1,0,0,0,0],
            [5,4,3,2,1]
        ];

        for (const p of testCases) {
            expect(powerToBernsteinBasis(p)).toEqual(powerToBernsteinBasis01(p));
        }
    });

    it('should round-trip power basis to Bernstein basis coefficients',
    function() {
        const testCases: [number[], number, number][] = [
            [[1,0],         0, 1],
            [[1,0,0],       0, 1],
            [[1,0,0,0],     0, 1],
            [[1,0,0,0,0],   0, 1],
            [[5,4,3,2,1],   0, 1],
            [[1,0],         2, 5],
            [[1,0,0],       2, 5],
            [[5,4,3,2,1],   2, 5]
        ];

        for (const [p, a, b] of testCases) {
            const bern = powerToBernsteinBasis(p, a, b);
            const p2 = bernsteinToPowerBasis(bern, a, b);
            for (let i = 0; i < p.length; i++) {
                expect(p2[i]).toBeCloseTo(p[i], 10);
            }
        }
    });
});
