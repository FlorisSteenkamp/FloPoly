import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../../src/basic/bigint/b-equal.js';
import { bFromRoots } from '../../../../src/roots/from-roots/bigint/b-from-roots.js';


describe('bFromRoots', function() {
    it('should calculate some polynomials correctly from given roots', 
    function() {
        let p1 = [1n,2n,3n,3n];
        expect(bEqual(bFromRoots(p1), [1n, -9n, 29n, -39n, 18n])).toEqual(true);
    });
});