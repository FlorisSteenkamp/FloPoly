import { describe, expect, it } from '@jest/globals';
import { bNumRootsInRange } from '../../../../src/roots/sturm/bigint/b-num-roots-in-range.js';
import { roots } from '../../../../src/roots/descartes/roots.js';


describe('bNumRootsInRange', function() {
    it('should correctly calculate the number of roots within an interval for some polynomials', 
    function() {
        {
            const p = [1, 1, -64, 236, -240]; // roots at 2, 3, 4, -10
            const pB = p.map(BigInt);
            // roots(p);//?
            expect(bNumRootsInRange(pB,-20n,-11n)).toEqual(0);
            expect(bNumRootsInRange(pB,-11n,-9n)).toEqual(1);
            expect(bNumRootsInRange(pB,-11n,3n)).toEqual(3);
            expect(bNumRootsInRange(pB,-11n,5n)).toEqual(4);

            expect(bNumRootsInRange(pB,-11n,-9n)).toEqual(1);
        }
    });

    it('should count multiple roots at the endpoints once',
    function() {
        // Regression: Sturm's theorem requires the endpoints not to be
        // multiple roots; a multiple root at `b` was previously counted twice
        // and a multiple root at `a` was counted with multiplicity
        const p = [1n, -4n, 5n, -2n];  // (x-1)^2 (x-2)
        expect(bNumRootsInRange(p, 0n, 1n)).toEqual(1);
        expect(bNumRootsInRange(p, 1n, 3n)).toEqual(2);
        expect(bNumRootsInRange(p, 1n, 2n)).toEqual(2);
        expect(bNumRootsInRange(p, 0n, 3n)).toEqual(2);
        expect(bNumRootsInRange(p, 1n, 1n)).toEqual(1);
        expect(bNumRootsInRange(p, 2n, 2n)).toEqual(1);
        expect(bNumRootsInRange(p, 0n, 0n)).toEqual(0);
        expect(bNumRootsInRange(p, 2n, 5n)).toEqual(1);
        expect(bNumRootsInRange(p, 3n, 5n)).toEqual(0);
        expect(bNumRootsInRange([1n, -2n, 1n], 1n, 2n)).toEqual(1);  // (x-1)^2
        expect(bNumRootsInRange([1n, -2n, 1n], 0n, 1n)).toEqual(1);  // (x-1)^2
    });

    it('should handle constant, zero, leading-zero polynomials and empty intervals',
    function() {
        expect(bNumRootsInRange([], 0n, 1n)).toEqual(Infinity);
        expect(bNumRootsInRange([0n], 0n, 1n)).toEqual(Infinity);
        expect(bNumRootsInRange([0n, 0n], 0n, 1n)).toEqual(Infinity);
        expect(bNumRootsInRange([0n, 0n], 1n, 0n)).toEqual(0);  // empty interval
        expect(bNumRootsInRange([5n], 0n, 1n)).toEqual(0);
        expect(bNumRootsInRange([0n, 2n, -1n], 0n, 1n)).toEqual(1);  // 2x - 1
        expect(bNumRootsInRange([0n, 0n, 1n, -2n], 0n, 1n)).toEqual(0);  // x - 2
        expect(bNumRootsInRange([1n, -4n, 5n, -2n], 3n, 0n)).toEqual(0);  // a > b
    });
});
