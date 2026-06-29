import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../../src/basic/expansion/e-equal.js';
import { eFromRoots } from '../../../../src/roots/from-roots/expansion/e-from-roots.js';


describe('eFromRoots', function() {
    it('should calculate some polynomials correctly from given roots', 
    function() {
        let p1 = [[1],[2],[3],[3]];
        expect(eEqual(
            eFromRoots(p1).pDd, [[0,1], [0,-9], [0,29], [0,-39], [0,18]]
        ));
    });
});