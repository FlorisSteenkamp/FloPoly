import { describe, expect, it } from '@jest/globals';
import { bFactorial } from '../../../src/util/bigint/b-factorial.js';


describe('bFactorial', function() {
    it('returns known small values', function() {
        expect(bFactorial(0)).toBe(1n);
        expect(bFactorial(1)).toBe(1n);
        expect(bFactorial(5)).toBe(120n);
    });

    it('returns values beyond cache', function() {
        expect(bFactorial(19)).toBe(121645100408832000n);
        expect(bFactorial(20)).toBe(2432902008176640000n);
    });

    it('returns values beyond what double precision can handle', function() {
        expect(bFactorial(50)).toBe(30414093201713378043612608166064768844377641568960512000000000000n);
    });
});
