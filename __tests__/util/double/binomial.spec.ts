import { describe, expect, it } from '@jest/globals';
import { binomial } from '../../../src/util/double/binomial.js';


describe('binomial', function() {
    it('returns known values', function() {
        expect(binomial(5, 3)).toBe(10);
        expect(binomial(10, 0)).toBe(1);
        expect(binomial(10, 10)).toBe(1);
    });

    it('works when extending beyond initial cache size', function() {
        expect(binomial(12, 6)).toBe(924);
    });

    it('throws when n exceeds maximum supported limit', function() {
        expect(() => binomial(61, 3)).toThrow();
    });

    it('does not throw when n is below maximum supported limit', function() {
        expect(binomial(60, 30)).toBe(118264581564861420);
    });

    // binomial(9,4);//?
});
