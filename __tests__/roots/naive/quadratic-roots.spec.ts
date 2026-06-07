import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { quadraticRoots } from '../../../src/roots/naive/quadratic-roots.js';


describe('quadraticRoots', function() {
	it('should correctly calculate the quadratic roots of some 2nd order polynomials', 
	function() {
		expect(equal(quadraticRoots([1, -3, 2]), [1,2])).toBeTruthy(); 
		expect(equal(quadraticRoots([1, 0, -1]), [-1,1])).toBeTruthy();
		expect(equal(quadraticRoots([1, 6, 8]), [-4,-2])).toBeTruthy();
		expect(equal(quadraticRoots([1, 0, 0]), [0])).toBeTruthy();
		expect(equal(quadraticRoots([1,-20,100]), [10])).toBeTruthy();
		expect(equal(quadraticRoots([1,-20,101]), [])).toBeTruthy();
	});
});