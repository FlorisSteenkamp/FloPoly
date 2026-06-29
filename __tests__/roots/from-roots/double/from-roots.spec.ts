import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../../src/basic/double/equal.js';
import { fromRoots } from '../../../../src/roots/from-roots/double/from-roots.js';


describe('fromRoots', function() {
    it('should calculate some polynomials correctly from given roots', 
    function() {
        let p1 = [1,2,3,3];
        expect(equal(fromRoots(p1), [1, -9, 29, -39, 18])).toEqual(true);
    });
});