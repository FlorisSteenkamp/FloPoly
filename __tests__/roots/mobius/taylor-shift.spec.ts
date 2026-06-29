import { describe, expect, it } from '@jest/globals';
import { taylorShift } from '../../../src/basic/double/taylor-shift.js';
import { Horner } from '../../../src/evaluate/double/horner.js';


describe('taylorShift', function() {
    it('should return the empty array for the zero polynomial', function() {
        expect(taylorShift([], 1)).toEqual([]);
        expect(taylorShift([], 0)).toEqual([]);
        expect(taylorShift([], -3.5)).toEqual([]);
    });

    it('should leave a constant polynomial unchanged', function() {
        expect(taylorShift([5], 2)).toEqual([5]);
        expect(taylorShift([0], 7)).toEqual([0]);
        expect(taylorShift([-3.5], -1)).toEqual([-3.5]);
    });

    it('should leave any polynomial unchanged when shifting by 0', function() {
        expect(taylorShift([1, 2, 3], 0)).toEqual([1, 2, 3]);
        expect(taylorShift([5, -3, 0, 7], 0)).toEqual([5, -3, 0, 7]);
    });

    it('should shift a linear polynomial', function() {
        // f(x) = x + 2  ->  f(x + 1) = x + 3
        expect(taylorShift([1, 2], 1)).toEqual([1, 3]);
        // f(x) = 2x - 1  ->  f(x + 3) = 2x + 5
        expect(taylorShift([2, -1], 3)).toEqual([2, 5]);
    });

    it('should shift a quadratic polynomial (the canonical x^2 - 1 example)', function() {
        // f(x) = x^2 - 1  ->  f(x + 1) = (x + 1)^2 - 1 = x^2 + 2x
        expect(taylorShift([1, 0, -1], 1)).toEqual([1, 2, 0]);
    });

    it('should shift by a negative amount', function() {
        // f(x) = x^2  ->  f(x - 2) = x^2 - 4x + 4
        expect(taylorShift([1, 0, 0], -2)).toEqual([1, -4, 4]);
    });

    it('should shift a cubic polynomial', function() {
        // f(x) = x^3  ->  f(x + 1) = x^3 + 3x^2 + 3x + 1
        expect(taylorShift([1, 0, 0, 0], 1)).toEqual([1, 3, 3, 1]);
    });

    it('should preserve the degree and leading coefficient', function() {
        const f = [3, -2, 5, 1];
        const shifted = taylorShift(f, 4.2);
        expect(shifted.length).toBe(f.length);
        expect(shifted[0]).toBe(f[0]);
    });

    it('should be its own inverse: taylorShift(taylorShift(f, h), -h) === f', function() {
        const f = [2, -7, 0, 4, -1];
        const h = 2.5;
        const back = taylorShift(taylorShift(f, h), -h);
        expect(back.length).toBe(f.length);
        for (let i = 0; i < f.length; i++) {
            expect(back[i]).toBeCloseTo(f[i], 9);
        }
    });

    it('should satisfy shifted(x) === f(x + h) for random polynomials and points', function() {
        for (let t = 0; t < 500; t++) {
            const n = Math.floor(Math.random() * 8);
            const f: number[] = [];
            for (let i = 0; i <= n; i++) {
                f.push(Math.round((Math.random() * 10 - 5) * 100) / 100);
            }
            if (f[0] === 0) { f[0] = 1; }

            const h = Math.round((Math.random() * 6 - 3) * 100) / 100;
            const shifted = taylorShift(f, h);

            for (let s = 0; s < 5; s++) {
                const x = Math.random() * 4 - 2;
                const shiftedVal = Horner(shifted, x);
                const originalVal = Horner(f, x + h);
                expect(shiftedVal).toBeCloseTo(originalVal, 6);
            }
        }
    });
});
