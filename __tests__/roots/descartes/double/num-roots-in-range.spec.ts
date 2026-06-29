import { describe, expect, it } from '@jest/globals';

import { numRootsInRange } from '../../../../src/roots/descartes/double/num-roots-in-range.js';


describe('numRootsInRange', function() {
    it('should correctly calculate the number of roots within an interval for some polynomials', 
    function() {
        {
            let p = [1, 1, -64, 236, -240]; // roots at 2, 3, 4, -10
            expect(numRootsInRange(p,-20,-11)).toEqual(0);
            expect(numRootsInRange(p,-11,-9)).toEqual(1);    
            expect(numRootsInRange(p,-11,3.5)).toEqual(3); 
            expect(numRootsInRange(p,-11,5)).toEqual(4);   

            expect(numRootsInRange(p,-10.00000000001,-9.99999999999)).toEqual(1);
        }
    });
});
