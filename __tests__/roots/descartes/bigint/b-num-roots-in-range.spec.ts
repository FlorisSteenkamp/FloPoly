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
});
