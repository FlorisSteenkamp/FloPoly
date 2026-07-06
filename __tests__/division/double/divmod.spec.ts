import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { divmod } from '../../../src/division/double/divmod.js';


describe('divmod', function() {
    it('should divide exactly when divisible', function() {
        const a = [1, 0, -1];
        const b = [1, -1];
        const { q, r } = divmod(a, b);

        expect(equal(q, [1, 1])).toEqual(true);
        expect(equal(r, [])).toEqual(true);
    });

    it('should return empty quotient when dividend degree is smaller', function() {
        const a = [2, 3];
        const b = [1, 0, 1];
        const { q, r } = divmod(a, b);

        expect(equal(q, [])).toEqual(true);
        expect(equal(r, a)).toEqual(true);
    });

    it('should handle non-monic divisors over doubles', function() {
        const a = [1, 0, 0];
        const b = [2, 0];
        const { q, r } = divmod(a, b);

        expect(equal(q, [0.5, 0])).toEqual(true);
        expect(equal(r, [])).toEqual(true);
    });

    it('should throw for zero divisor polynomial', function() {
        expect(() => divmod([1, 2, 3], [])).toThrow('division by zero polynomial');
    });
});
