import { describe, expect, it } from '@jest/globals';

import { numRoots } from '../../../../src/roots/descartes/double/num-roots.js';


describe('numRoots', function() {
	it('should correctly calculate the number of roots of some polynomials',
	function() {
		{
			let p = [1, 1, -64, 236, -240];
			expect(numRoots(p)).toEqual(4);
		}
	});
});


