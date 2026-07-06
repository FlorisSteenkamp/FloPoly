import { describe, expect, it } from '@jest/globals';
import { buildLargePrimePool, isPrime32, primes } from '../../../src/gcd/bigint/build-large-prime-pool.js';


describe('buildLargePrimePool', function() {
    it('should detect primality for a few known 32-bit values', function() {
        expect(isPrime32(2)).toEqual(true);
        expect(isPrime32(3)).toEqual(true);
        expect(isPrime32(4)).toEqual(false);
        expect(isPrime32(4294967291)).toEqual(true);
        expect(isPrime32(4294967295)).toEqual(false);
    });

    it('should build descending 32-bit odd primes near 2^32', function() {
        const pool = buildLargePrimePool(12);

        expect(pool.length).toEqual(12);
        expect(pool[0]).toEqual(4294967291n);
        for (let i = 0; i < pool.length; i++) {
            const p = Number(pool[i]);
            expect(isPrime32(p)).toEqual(true);
            expect(p % 2).toEqual(1);
            if (i > 0) {
                expect(pool[i] < pool[i - 1]).toEqual(true);
            }
        }
    });

    it('should expose a prebuilt pool that starts with the largest 32-bit prime', function() {
        expect(primes.length >= 64).toEqual(true);
        expect(primes[0]).toEqual(4294967291n);
        expect(isPrime32(Number(primes[primes.length - 1]))).toEqual(true);
    });
});
