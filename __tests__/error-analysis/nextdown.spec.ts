import { describe, expect, it } from '@jest/globals';
import { nextdown, nextdown2 } from '../../src/error-analysis/nextdown.js';
import { getUlp } from '../../src/error-analysis/get-ulp.js';


describe('nextdown', function() {
    // `Number.MIN_VALUE === 5e-324`
    // `Number.MAX_VALUE === 1.7976931348623157e+308`
    const specialCases: [number, number][] = [
        [Infinity, Number.MAX_VALUE],
        [-Infinity, -Infinity],
        [0, -Number.MIN_VALUE],
        [-0, -Number.MIN_VALUE],
        [-Number.MAX_VALUE, -Infinity]
    ];

    const edgeCases: [number, number][] = [
        [Number.MIN_VALUE, 0],
        [-Number.MIN_VALUE, -1e-323],
        [1.0000000000000002, 1],
        [1, 0.9999999999999999],
        [2.0000000000000004, 2],
        [2, 1.9999999999999998],
        [-0.9999999999999999, -1],
        [-1, -1.0000000000000002],
        [-0.49999999999999994, -0.5],
        [-3.9999999999999996, -4]
    ];

    const typicalCases: [number, number][] = [
        [123.456, 123.45599999999999],
        [-123.456, -123.45600000000002],
        [Number.MAX_VALUE / 2, 8.988465674311578e+307]
    ];

    it('should handle NaN', function() {
        expect(Number.isNaN(nextdown(Number.NaN))).toBe(true);
        expect(Number.isNaN(nextdown2(Number.NaN))).toBe(true);
    });

    it('should handle special values and representative cases', function() {
        for (const [v, r] of [...specialCases, ...edgeCases, ...typicalCases]) {
            expect(nextdown(v)).toBe(r);
            expect(nextdown2(v)).toBe(r);
        }
    });

    it('should correctly step from exact positive powers of two', function() {
        // For exact positive powers of two, the distance downward is half getUlp(x).
        expect(nextdown(1)).toBe(nextdown2(1));
        expect(nextdown(2)).toBe(nextdown2(2));
        expect(nextdown(0.5)).toBe(nextdown2(0.5));

        expect(nextdown(1)).toBe(1 - getUlp(1) / 2);
        expect(nextdown(2)).toBe(2 - getUlp(2) / 2);
        expect(nextdown(0.5)).toBe(0.5 - getUlp(0.5) / 2);
    });

    it('should overflow to -Infinity from -Number.MAX_VALUE', function() {
        expect(nextdown(-Number.MAX_VALUE)).toBe(-Infinity);
    });
});
