import { describe, expect, it } from '@jest/globals';

import { eNumRootsInRange } from '../../../../src/roots/descartes/expansion/e-num-roots-in-range.js';


describe('eNumRootsInRange', function() {
    it('should correctly calculate the number of roots within an interval for some polynomials', 
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(x => [x]);
            expect(eNumRootsInRange(p,[-20],[-11])).toEqual(0);
            expect(eNumRootsInRange(p,[-11],[-9])).toEqual(1);    
            expect(eNumRootsInRange(p,[-11],[3.5])).toEqual(3); 
            expect(eNumRootsInRange(p,[-11],[5])).toEqual(4);   
            
            expect(eNumRootsInRange(p,[-10.00000000001],[-9.99999999999])).toEqual(1);
        }
    });
});
