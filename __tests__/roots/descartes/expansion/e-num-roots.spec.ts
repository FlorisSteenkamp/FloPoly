import { describe, expect, it } from '@jest/globals';
import { eNumRoots } from '../../../../src/roots/sturm/expansion/e-num-roots.js';


describe('eNumRoots', function() {
    it('should correctly calculate the number of roots of some polynomials', 
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(x => [x]);
            expect(eNumRoots(p)).toEqual(4);
        }
    });
});
