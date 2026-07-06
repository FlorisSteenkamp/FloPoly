import { describe, expect, it } from '@jest/globals';
import { numRoots } from '../../../../src/roots/sturm/double/num-roots.js';
import { fromRoots } from '../../../../src/roots/from-roots/double/from-roots.js';


describe('numRoots', function() {
    it('should correctly calculate the number of roots of some polynomials',
    function() {
        {
            let p = [1, 1, -64, 236, -240];
            expect(numRoots(p)).toEqual(4);
        }
        {
            const p = fromRoots([-1, -1, -1, 2, 3, 4]);
            expect(numRoots(p)).toEqual(4);
        }
        {
            const p = fromRoots([-1, 2, 2, 2, 3, 4]);
            expect(numRoots(p)).toEqual(4);
        }
    });
});


