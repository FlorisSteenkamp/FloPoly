import { describe, expect, it } from '@jest/globals';
import { nextup, nextUp2 } from '../../src/error-analysis/nextup.js';
import { getUlp } from '../../src/error-analysis/get-ulp.js';


describe('nextup', function() {
    expect(Number.isNaN(nextup(Number.NaN))).toBe(true);

    // `Number.MIN_VALUE === 5e-324`
    // `Number.MAX_VALUE === 1.7976931348623157e+308`
    const specialCases: [number, number][] = [
        [Infinity, Infinity],
        [-Infinity, -Number.MAX_VALUE],
        [0, Number.MIN_VALUE],
        [-0, Number.MIN_VALUE],
        [Number.MAX_VALUE, Infinity]
    ];

    const edgeCases: [number, number][] = [
        [-Number.MIN_VALUE, -0],
        [Number.MIN_VALUE, 1e-323],
        [0.9999999999999999, 1],
        [1, 1.0000000000000002],
        [1.9999999999999998, 2],
        [2, 2.0000000000000004],
        [-1, -0.9999999999999999],
        [-2, -1.9999999999999998],
        [-0.5, -0.49999999999999994],
        [-4, -3.9999999999999996]
    ];

    // Number.MAX_VALUE / 2 === 8.988465674311579e+307
    const typicalCases: [number, number][] = [
        [123.456, 123.45600000000002],
        [-123.456, -123.45599999999999],
        [Number.MAX_VALUE / 2, 8.98846567431158e+307]
    ];


    for (let [v, r] of [...specialCases, ...edgeCases, ...typicalCases]) {
        expect(nextup(v)).toEqual(r);
        expect(nextUp2(v)).toEqual(r);
    }

    it('should correctly step from exact negative powers of two', function() {
        // For exact negative powers of two, the distance upward is half getUlp(x).
        expect(nextup(-1)).toBe(nextUp2(-1));
        expect(nextup(-2)).toBe(nextUp2(-2));
        expect(nextup(-0.5)).toBe(nextUp2(-0.5));

        expect(nextup(-1)).toBe(-1 + getUlp(-1) / 2);
        expect(nextup(-2)).toBe(-2 + getUlp(-2) / 2);
        expect(nextup(-0.5)).toBe(-0.5 + getUlp(-0.5) / 2);
    });

    it('should overflow to Infinity from Number.MAX_VALUE', function() {
        expect(nextup(Number.MAX_VALUE)).toBe(Infinity);
    });
});
