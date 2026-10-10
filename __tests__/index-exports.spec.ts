import { describe, expect, it } from '@jest/globals';
import * as lib from '../src/index.js';


describe('index exports', function() {
    it('should export the utility, generator and Karatsuba functions', function() {
        expect(lib.multiplyKaratsuba([1,2,3], [2,5,3,5])).toEqual([2, 9, 19, 26, 19, 15]);
        expect(lib.binomial(5, 2)).toEqual(10);
        expect(lib.factorial(5)).toEqual(120);
        expect(lib.bBinomial(5n, 2n)).toEqual(10n);
        expect(lib.bFactorial(5)).toEqual(120n);
        expect(lib.bSum([1n, 2n])).toEqual(3n);
        expect(lib.bSqrtCeil(10n)).toEqual(4n);
        expect(lib.generateMignottePolynomial(3, 2)).toEqual([1, -8, 8, -2]);
        expect(lib.ddGenerateMignottePolynomial(3, 2)).toEqual([[0,1], [0,-8], [0,8], [0,-2]]);
        expect(lib.eGenerateMignottePolynomial(3, 2)).toEqual([[1], [-8], [8], [-2]]);
        expect(lib.bLandauMignotteBoundBigint([1n, 1n], [1n, 1n]) >= 1n).toBe(true);
    });
});
