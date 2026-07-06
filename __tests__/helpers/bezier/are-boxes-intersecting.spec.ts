import { describe, expect, it } from '@jest/globals';
import { areBoxesIntersecting } from './are-boxes-intersecting.js';


describe('areBoxesIntersecting', function() {
    it('should return true for overlapping interiors (open and closed)', function() {
        const a = [[0, 0], [2, 2]];
        const b = [[1, 1], [3, 3]];

        expect(areBoxesIntersecting(true, a, b)).toBe(true);
        expect(areBoxesIntersecting(false, a, b)).toBe(true);
    });

    it('should treat touching edges as intersecting only for closed boxes', function() {
        const a = [[0, 0], [1, 1]];
        const b = [[1, 0], [2, 1]];

        expect(areBoxesIntersecting(true, a, b)).toBe(true);
        expect(areBoxesIntersecting(false, a, b)).toBe(false);
    });

    it('should treat touching corners as intersecting only for closed boxes', function() {
        const a = [[0, 0], [1, 1]];
        const b = [[1, 1], [2, 2]];

        expect(areBoxesIntersecting(true, a, b)).toBe(true);
        expect(areBoxesIntersecting(false, a, b)).toBe(false);
    });

    it('should return false for separated boxes', function() {
        const a = [[0, 0], [1, 1]];
        const b = [[2, 2], [3, 3]];

        expect(areBoxesIntersecting(true, a, b)).toBe(false);
        expect(areBoxesIntersecting(false, a, b)).toBe(false);
    });

    it('should be order-invariant for box coordinates', function() {
        const a = [[2, 2], [0, 0]];
        const b = [[3, 3], [1, 1]];

        expect(areBoxesIntersecting(true, a, b)).toBe(true);
        expect(areBoxesIntersecting(false, a, b)).toBe(true);
    });

    it('should handle containment correctly', function() {
        const outer = [[-3, -3], [3, 3]];
        const inner = [[-1, -1], [1, 1]];

        expect(areBoxesIntersecting(true, outer, inner)).toBe(true);
        expect(areBoxesIntersecting(false, outer, inner)).toBe(true);
    });
});
