import { describe, expect, it } from '@jest/globals';
import { numRootsInRange } from '../../../src/roots/sturm/double/num-roots-in-range.js';
import { eNumRootsInRange } from '../../../src/roots/sturm/expansion/e-num-roots-in-range.js';


describe('numRootsInRange / eNumRootsInRange with extreme endpoints', function() {
    it('should handle endpoints that need more than 1024 bits when scaled to integers', function() {
        // Regression: `Number(V)` overflowed to `Infinity` and `BigInt(Infinity)` threw
        expect(numRootsInRange([1, -1], 5e-324, 1e300)).toEqual(1);        // root 1
        expect(numRootsInRange([1, -1], -1e300, 5e-324)).toEqual(0);
        expect(numRootsInRange([1, -3, 2], -5e-324, 1e300)).toEqual(2);    // roots 1, 2
        expect(numRootsInRange([1, 0, -4], -1e300, -5e-324)).toEqual(1);   // root -2
        expect(eNumRootsInRange([[1], [-1]], [5e-324], [1e300])).toEqual(1);
        expect(eNumRootsInRange([[1], [-3], [2]], [-5e-324], [1e300])).toEqual(2);
        expect(eNumRootsInRange([[1], [0], [-4]], [-1e300], [-5e-324])).toEqual(1);
    });

    it('should still agree with the plain cases', function() {
        const p = [1, 1, -64, 236, -240];  // roots -10, 2, 3, 4
        expect(numRootsInRange(p, -20, -11)).toEqual(0);
        expect(numRootsInRange(p, -11, -9)).toEqual(1);
        expect(numRootsInRange(p, -11, 3.5)).toEqual(3);
        expect(numRootsInRange(p, -11, 5)).toEqual(4);
        expect(numRootsInRange(p, 0.25, 3.75)).toEqual(2);
        expect(numRootsInRange(p, 2, 4)).toEqual(3);
        expect(eNumRootsInRange(p.map(c => [c]), [0.25], [3.75])).toEqual(2);
        expect(eNumRootsInRange(p.map(c => [c]), [2], [4])).toEqual(3);
    });
});
