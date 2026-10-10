import { describe, expect, it } from '@jest/globals';
import { generateMignottePolynomial } from '../../src/generate/generate-mignotte-poly.js';
import { ddGenerateMignottePolynomial } from '../../src/generate/dd-generate-mignotte-poly.js';
import { eGenerateMignottePolynomial } from '../../src/generate/e-generate-mignotte-poly.js';
import { eEstimate } from 'big-float-ts';


describe('ddGenerateMignottePolynomial / eGenerateMignottePolynomial', function() {
    it('should generate the classic Mignotte polynomial', function() {
        expect(ddGenerateMignottePolynomial(3, 2)).toEqual([[0,1], [0,-8], [0,8], [0,-2]]);
        expect(eGenerateMignottePolynomial(3, 2)).toEqual([[1], [-8], [8], [-2]]);
    });

    it('should handle d === 2 (the x^2 terms coincide)', function() {
        // Regression: previously the x^d coefficient was overwritten
        expect(ddGenerateMignottePolynomial(2, 3)).toEqual([[0,-17], [0,12], [0,-2]]);
        expect(eGenerateMignottePolynomial(2, 3)).toEqual([[-17], [12], [-2]]);
        expect(generateMignottePolynomial(2, 3)).toEqual([-17, 12, -2]);
    });

    it('should agree with the double precision variant', function() {
        for (const [d, v] of [[2, 1], [2, 5], [3, 2], [5, 7], [10, 3], [20, 1000]]) {
            const p = generateMignottePolynomial(d, v);
            expect(ddGenerateMignottePolynomial(d, v).map(c => c[0] + c[1])).toEqual(p);
            expect(eGenerateMignottePolynomial(d, v).map(eEstimate)).toEqual(p);
        }
    });

    it('should not alias the zero coefficients', function() {
        // Regression: `new Array(d+1).fill([0,0])` shared one array object
        const p = ddGenerateMignottePolynomial(6, 2);
        expect(p[1]).not.toBe(p[2]);
        p[1][1] = 123;
        expect(p[2]).toEqual([0,0]);
        const q = eGenerateMignottePolynomial(6, 2);
        expect(q[1]).not.toBe(q[2]);
    });

    it('should be exact for large v', function() {
        // v² is not representable as a double but is as a double-double
        const v = 2**30 + 1;
        const dd = ddGenerateMignottePolynomial(4, v);
        expect(dd[2][1] + dd[2][0]).toEqual(-2*v*v);  // approx
        expect(dd[2][0] !== 0).toBe(true);           // the low part carries the exact remainder
        const e = eGenerateMignottePolynomial(4, v);
        expect(e[2].length).toEqual(2);
    });

    it('should throw for d < 2', function() {
        expect(() => ddGenerateMignottePolynomial(1, 2)).toThrow();
        expect(() => eGenerateMignottePolynomial(1, 2)).toThrow();
    });
});
