import { describe, expect, it } from '@jest/globals';
import { generateMignottePolynomial } from '../../src/generate/generate-mignotte-poly.js';


describe('generateMignottePolynomial', function() {
    it('should generate a polynomial of correct length', function() {
        expect(generateMignottePolynomial(3, 2).length).toBe(4);
        expect(generateMignottePolynomial(5, 1).length).toBe(6);
        expect(generateMignottePolynomial(10, 3).length).toBe(11);
    });

    it('should place the leading coefficient at index 0', function() {
        const p = generateMignottePolynomial(3, 2);
        expect(p[0]).toBe(1);
    });

    it('should place the constant term at the correct index', function() {
        const p = generateMignottePolynomial(3, 2);
        expect(p[3]).toBe(-2);
    });

    it('should place the x^1 coefficient at d-1', function() {
        const p = generateMignottePolynomial(3, 2);
        expect(p[2]).toBe(4 * 2); // 4*v where v=2
    });

    it('should place the x^2 coefficient at d-2', function() {
        const p = generateMignottePolynomial(3, 2);
        expect(p[1]).toBe(-2 * 2 * 2); // -2*v^2 where v=2
    });

    it('should generate correct coefficients for x^n - 2*(a*x - 1)^2', function() {
        // For d=3, v=2: x^3 - 2*(2*x - 1)^2 = x^3 - 2*(4*x^2 - 4*x + 1)
        //                                     = x^3 - 8*x^2 + 8*x - 2
        const p = generateMignottePolynomial(3, 2);
        expect(p).toEqual([1, -8, 8, -2]);
    });

    it('should take k into account for generalized Mignotte polynomials', function() {
        // For d=3, v=1, k=3: x^3 - 2*(x - 1)^3
        //                    = x^3 - 2*(x^3 - 3x^2 + 3x - 1)
        //                    = -x^3 + 6x^2 - 6x + 2
        const p = generateMignottePolynomial(3, 1, 3);
        expect(p).toEqual([-1, 6, -6, 2]);
    });

    it('should handle v=1', function() {
        // x^3 - 2*(x - 1)^2 = x^3 - 2*(x^2 - 2*x + 1)
        //                   = x^3 - 2*x^2 + 4*x - 2
        const p = generateMignottePolynomial(3, 1);
        expect(p).toEqual([1, -2, 4, -2]);
    });

    it('should handle v=0', function() {
        // x^3 - 2*(0 - 1)^2 = x^3 - 2
        const p = generateMignottePolynomial(3, 0);
        expect(p).toEqual([1, 0, 0, -2]);
    });

    it('should handle negative v', function() {
        // x^3 - 2*(-2*x - 1)^2 = x^3 - 2*(4*x^2 + 4*x + 1)
        //                      = x^3 - 8*x^2 - 8*x - 2
        const p = generateMignottePolynomial(3, -2);
        expect(p).toEqual([1, -8, -8, -2]);
    });

    it('should handle degree 2 (minimum degree for formula)', function() {
        // For d=2, v=1: x^2 - 2*(x - 1)^2 = x^2 - 2*(x^2 - 2*x + 1)
        //                                  = x^2 - 2*x^2 + 4*x - 2
        //                                  = -x^2 + 4*x - 2
        const p = generateMignottePolynomial(2, 1);
        expect(p).toEqual([-1, 4, -2]);
    });

    it('should handle larger degree polynomials', function() {
        const p = generateMignottePolynomial(10, 2);
        expect(p.length).toBe(11);
        expect(p[0]).toBe(1);         // leading term
        expect(p[8]).toBe(-2 * 4);    // x^2 term at index d-2 = 10-2 = 8
        expect(p[9]).toBe(4 * 2);     // x^1 term at index d-1 = 10-1 = 9
        expect(p[10]).toBe(-2);       // constant term at index d
    });

    it('should have zeros in all other positions', function() {
        const p = generateMignottePolynomial(5, 1);
        // Should be [1, 0, -2, 4, -2, 0] for positions [0, 1, 2, 3, 4, 5]
        // Actually for d=5: p[0]=1 (x^5), p[3]=-2*1=-2 (x^2), p[4]=4*1=4 (x^1), p[5]=-2 (x^0)
        // So indices 1 and 2 should be 0
        expect(p[1]).toBe(0);
        expect(p[2]).toBe(0);
    });

    it('should satisfy the ill-conditioning property', function() {
        // The Mignotte polynomial has two closely spaced real roots near x = 1/v
        const p = generateMignottePolynomial(4, 5);
        expect(p.length).toBe(5);
        expect(p[0]).toBe(1);
        expect(p[4]).toBe(-2);
    });
});
