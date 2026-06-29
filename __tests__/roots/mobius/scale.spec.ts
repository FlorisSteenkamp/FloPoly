import { describe, expect, it } from '@jest/globals';
import { Horner } from '../../../src/evaluate/double/horner.js';
import { scale, inplaceScale } from '../../../src/change-variables/double/scale.js';
import { changeVariablesScale } from '../../../src/change-variables/double/scale.js';


describe('scale', function() {
    it('should return the empty array for the zero polynomial', function() {
        expect(scale([], 2)).toEqual([]);
        expect(scale([], 0)).toEqual([]);
        expect(scale([], -3.5)).toEqual([]);

        expect(changeVariablesScale([], 2)).toEqual([]);
        expect(changeVariablesScale([], 0)).toEqual([]);
        expect(changeVariablesScale([], -3.5)).toEqual([]);
    });
    it('should return the empty array for the zero polynomial (in-place version)', function() {
        {
            const p: number[] = [];
            inplaceScale(p, 2);
            expect(p).toEqual([]);
        }
        {
            const p: number[] = [];
            inplaceScale(p, 0);
            expect(p).toEqual([]);
        }
        {
            const p: number[] = [];
            inplaceScale(p, -3.5);
            expect(p).toEqual([]);
        }
    });

    it('should leave a constant polynomial unchanged', function() {
        expect(scale([5], 2)).toEqual([5]);
        expect(scale([0], 7)).toEqual([0]);
        expect(scale([-3.5], -1)).toEqual([-3.5]);
    });
    it('should leave a constant polynomial unchanged (in-place version)', function() {
        {
            const p = [5];
            inplaceScale(p, 2);
            expect(p).toEqual([5]);
        }
        {
            const p = [0];
            inplaceScale(p, 7);
            expect(p).toEqual([0]);
        }
        {
            const p = [-3.5];
            inplaceScale(p, -1);
            expect(p).toEqual([-3.5]);
        }
    });

    it('should leave any polynomial unchanged when scaling by 1', function() {
        expect(scale([1, 2, 3], 1)).toEqual([1, 2, 3]);
        expect(scale([5, -3, 0, 7], 1)).toEqual([5, -3, 0, 7]);
    });
    it('should leave any polynomial unchanged when scaling by 1 (in-place version)', function() {
        {
            const p = [1, 2, 3];
            inplaceScale(p, 1);
            expect(p).toEqual([1, 2, 3]);
        }
        {
            const p = [5, -3, 0, 7];
            inplaceScale(p, 1);
            expect(p).toEqual([5, -3, 0, 7]);
        }
    });

    it('should scale the coefficient of xⁱ by sⁱ', function() {
        // f(x) = x^2 + x + 1  ->  f(2x) = 4x^2 + 2x + 1
        expect(scale([1, 1, 1], 2)).toEqual([4, 2, 1]);
        // f(x) = 3x^3 + 2x^2 + x + 5  ->  f(2x) = 24x^3 + 8x^2 + 2x + 5
        expect(scale([3, 2, 1, 5], 2)).toEqual([24, 8, 2, 5]);
    });
    it('should scale the coefficient of xⁱ by sⁱ (in-place version)', function() {
        {
            const p = [1, 1, 1];
            inplaceScale(p, 2);
            expect(p).toEqual([4, 2, 1]);
        }
        {
            const p = [3, 2, 1, 5];
            inplaceScale(p, 2);
            expect(p).toEqual([24, 8, 2, 5]);
        }
    });

    it('should handle a negative scale factor', function() {
        // f(x) = x^3 + x^2 + x + 1  ->  f(-x) = -x^3 + x^2 - x + 1
        expect(scale([1, 1, 1, 1], -1)).toEqual([-1, 1, -1, 1]);
    });
    it('should handle a negative scale factor (in-place version)', function() {
        const p = [1, 1, 1, 1];
        inplaceScale(p, -1);
        expect(p).toEqual([-1, 1, -1, 1]);
    });

    it('should zero out all but the constant term when scaling by 0', function() {
        // f(x) = 2x^2 + 3x + 4  ->  f(0·x) keeps only the constant term
        expect(scale([2, 3, 4], 0)).toEqual([0, 0, 4]);
    });
    it('should zero out all but the constant term when scaling by 0 (in-place version)', function() {
        const p = [2, 3, 4];
        inplaceScale(p, 0);
        expect(p).toEqual([0, 0, 4]);
    });

    it('should handle a fractional scale factor', function() {
        // f(x) = 4x^2 + 2x + 1  ->  f(x/2) = x^2 + x + 1
        expect(scale([4, 2, 1], 0.5)).toEqual([1, 1, 1]);
    });
    it('should handle a fractional scale factor (in-place version)', function() {
        const p = [4, 2, 1];
        inplaceScale(p, 0.5);
        expect(p).toEqual([1, 1, 1]);
    });

    it('should preserve the degree and the constant term', function() {
        const f = [3, -2, 5, 1];
        const scaled = scale(f, 4.2);
        expect(scaled.length).toBe(f.length);
        // constant term (coefficient of x^0) is scaled by s^0 = 1
        expect(scaled[scaled.length - 1]).toBe(f[f.length - 1]);
    });
    it('should preserve the degree and the constant term (in-place version)', function() {
        const p = [3, -2, 5, 1];
        inplaceScale(p, 4.2);
        expect(p.length).toBe(4);
        // constant term (coefficient of x^0) is scaled by s^0 = 1
        expect(p[p.length - 1]).toBe(1);
    });

    it('should not mutate the input polynomial', function() {
        const f = [1, 2, 3];
        scale(f, 5);
        expect(f).toEqual([1, 2, 3]);
    });
    it('should mutate the input polynomial (in-place version)', function() {
        const p = [1, 2, 3];
        inplaceScale(p, 5);
        expect(p).toEqual([25, 10, 3]);
    });

    it('should compose: scale(scale(f, s), t) === scale(f, s·t)', function() {
        const f = [2, -7, 0, 4, -1];
        const s = 1.5;
        const t = -2;
        expect(scale(scale(f, s), t)).toEqual(scale(f, s * t));
    });
    it('should compose: inplaceScale(inplaceScale(f, s), t) === inplaceScale(f, s·t)', function() {
        const f = [2, -7, 0, 4, -1];
        const s = 1.5;
        const t = -2;

        const p1 = [...f];
        inplaceScale(p1, s);
        inplaceScale(p1, t);

        const p2 = [...f];
        inplaceScale(p2, s * t);

        expect(p1).toEqual(p2);
    });

    it('should satisfy scaled(x) === f(s·x) for random polynomials and points', function() {
        for (let n = 0; n <= 7; n++) {
            const f: number[] = [];
            for (let i = 0; i <= n; i++) {
                f.push(Math.round((Math.random() * 10 - 5) * 100) / 100);
            }
            if (f[0] === 0) { f[0] = 1; }

            const s = Math.round((Math.random() * 6 - 3) * 100) / 100;
            const scaled = scale(f, s);

            for (let k = 0; k < 5; k++) {
                const x = Math.random() * 4 - 2;
                expect(Horner(scaled, x)).toBeCloseTo(Horner(f, s * x), 6);
            }
        }
    });
    it('should satisfy scaled(x) === f(s·x) for random polynomials and points (in-place version)', function() {
        for (let n = 0; n <= 7; n++) {
            const f: number[] = [];
            for (let i = 0; i <= n; i++) {
                f.push(Math.round((Math.random() * 10 - 5) * 100) / 100);
            }
            if (f[0] === 0) { f[0] = 1; }

            const s = Math.round((Math.random() * 6 - 3) * 100) / 100;
            const p = [...f];
            inplaceScale(p, s);

            for (let k = 0; k < 5; k++) {
                const x = Math.random() * 4 - 2;
                expect(Horner(p, x)).toBeCloseTo(Horner(f, s * x), 6);
            }
        }
    });
});
