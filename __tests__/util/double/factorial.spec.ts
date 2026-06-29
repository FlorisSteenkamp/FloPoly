import { describe, expect, it } from '@jest/globals';
import { factorial } from '../../../src/util/double/factorial.js';
import { bFactorial } from '../../../src/util/bigint/b-factorial.js';


describe('factorial', function() {
    it('returns known small values', function() {
        expect(factorial(0)).toBe(1);
        expect(factorial(1)).toBe(1);
        expect(factorial(5)).toBe(120);
    });

    it('returns values beyond cache', function() {
        expect(factorial(19)).toBe(121645100408832000);
        expect(factorial(20)).toBe(2432902008176640000);
    });

    it('matches bigint factorial for first 100 values', function() {
        for (let i=0; i<23; i++) {
            expect(bFactorial(i)).toBe(BigInt(factorial(i)));
        }
    });

    it ('throws for values beyond 23', function() {
        // Cannot be represented as a double, so we throw an error
        expect(() => factorial(24)).toThrow();
    });
});
