import { describe, expect, it } from '@jest/globals';

import { bNumRootsInRange } from '../../../../src/roots/descartes/bigint/b-num-roots-in-range.js';


describe('bNumRootsInRange', function() {
    it('should correctly calculate the number of roots within an interval for some polynomials', 
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(BigInt);; // roots at 2, 3, 4, -10
            expect(bNumRootsInRange(p,-20n,-11n)).toEqual(0);
            expect(bNumRootsInRange(p,-11n,-9n)).toEqual(1);    
            expect(bNumRootsInRange(p,-11n,4n)).toEqual(3); 
            expect(bNumRootsInRange(p,-11n,5n)).toEqual(4);   

            expect(bNumRootsInRange(p,-11n,-9n)).toEqual(1);
        }
    });
});
