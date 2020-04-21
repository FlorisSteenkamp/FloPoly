
import { assert, expect } from 'chai';
import { describe } from 'mocha';

import { isConstMultipleOf } from '../../src/basic/is-const-multiple-of';


describe('is-const-multiple-of', function() {
	it('should divide exact correctly', 
	function() {
        {
            // flo(0.2) === 2*fl(0.1)
            let a = [[0.1], [1]];
            let b = [[0.2], [2]];
            let res = isConstMultipleOf(a, b);
            assert(res);
        }

        {
            // flo(0.3) !== 3*fl(0.1)
            let a = [[0.1], [1]];
            let b = [[0.3], [3]];
            let res = isConstMultipleOf(a, b);
            assert(!res);
        }
	});
});
