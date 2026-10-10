import { describe, expect, it } from '@jest/globals';
import { bNumRootsIn01 } from '../../../../src/roots/sturm/bigint/b-num-roots-0-1.js';
import { toCasStr } from '../../../../src/basic/to-cas-str.js';
import { multiply } from '../../../../src/basic/double/multiply.js';
import { scaleFloatsToBigints } from '../../../../src/scale-to-int/scale-floats-to-bigints.js';


describe('bNumRootsIn01', function() {
    it('should correctly calculate the number of roots within the closed interval [0,1] for some polynomials',
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(BigInt);
            expect(
                bNumRootsIn01(p)).toEqual(0);
        }
        
        {
            let p = [1, 0, 1, 0, -3, -3, 8, 2, -5].map(BigInt);
            expect(
                bNumRootsIn01(p)).toEqual(1);
        }
        {
            let p = [-1, 0, 1, 0, -3, -3, 8, 2, -5].map(BigInt);
            expect(
                bNumRootsIn01(p)).toEqual(0);
        }
        {
            let p = [-1, 0, -1, 0, +3, -3, 8, 2, -5].map(BigInt);
            expect(
                bNumRootsIn01(p)).toEqual(1);
        }
        
        {
            let p1 = multiply([1,-0.5], [1,-0.3]);
            let p2 = multiply([1,-0.1], [1,-0.9]);
            let p3 = multiply([1,-0.2], [1,-0.99]);
            let p4 = multiply([1,-0.0], [1,-0.09]);
            let p5 = multiply(p1, p2);
            let p6 = multiply(p3, p4);
            let p7 = multiply(p5, p6);
            //console.log(p7)
            let p8 = scaleFloatsToBigints(p7);
            expect(
                bNumRootsIn01(p8)).toEqual(8);
        }
        {
            let k = -0.001;
            let p1 = multiply([1,k*1], [1,k*5]);
            let p2 = multiply([1,k*2], [1,k*6]);
            let p3 = multiply([1,k*3], [1,k*7]);
            let p4 = multiply([1,k*4], [1,k*8]);
            let p5 = multiply(p1, p2);
            let p6 = multiply(p3, p4);
            let p7 = scaleFloatsToBigints(multiply(p5, p6));
            expect(
                bNumRootsIn01(p7)).toEqual(8);
        }
    });

    it('should count multiple roots at the endpoints once',
    function() {
        // Regression: Sturm's theorem requires the endpoints not to be
        // multiple roots; the multiple root at 1 was previously counted twice
        expect(bNumRootsIn01([1n, -4n, 5n, -2n])).toEqual(1);  // (x-1)^2 (x-2)
        expect(bNumRootsIn01([1n, -2n, 1n])).toEqual(1);       // (x-1)^2
        expect(bNumRootsIn01([1n, 0n, 0n])).toEqual(1);        // x^2
        expect(bNumRootsIn01([1n, -1n, 0n, 0n])).toEqual(2);   // x^2 (x-1)
        expect(bNumRootsIn01([1n, -2n, 1n, 0n])).toEqual(2);   // x (x-1)^2
        expect(bNumRootsIn01([2n, -1n, 0n])).toEqual(2);       // x (2x-1)
        expect(bNumRootsIn01([1n, -1n])).toEqual(1);           // x - 1
        expect(bNumRootsIn01([1n, -2n])).toEqual(0);           // x - 2
    });

    it('should handle constant, zero and leading-zero polynomials',
    function() {
        expect(bNumRootsIn01([])).toEqual(Infinity);
        expect(bNumRootsIn01([0n])).toEqual(Infinity);
        expect(bNumRootsIn01([0n, 0n])).toEqual(Infinity);
        expect(bNumRootsIn01([5n])).toEqual(0);
        expect(bNumRootsIn01([0n, 2n, -1n])).toEqual(1);   // 2x - 1
        expect(bNumRootsIn01([0n, 0n, 1n, -2n])).toEqual(0);  // x - 2
    });
});
