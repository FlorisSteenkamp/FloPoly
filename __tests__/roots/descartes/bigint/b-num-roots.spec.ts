import { describe, expect, it } from '@jest/globals';

import { bNumRoots } from '../../../../src/roots/descartes/bigint/b-num-roots.js';


describe('bNumRoots', function() {
	it('should correctly calculate the number of roots of some polynomials',
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(BigInt);;
			expect(bNumRoots(p)).toEqual(4);
		}
	});
});


