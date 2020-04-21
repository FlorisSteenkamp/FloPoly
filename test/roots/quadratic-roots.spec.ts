
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, quadraticRoots } from '../../src/index';


describe('quadraticRoots', function() {
	it('should correctly calculate the quadratic roots of some 2nd order polynomials', 
	function() {
		assert(equal(quadraticRoots([1, -3, 2]), [1,2])); 
		assert(equal(quadraticRoots([1, 0, -1]), [-1,1]));
		assert(equal(quadraticRoots([1, 6, 8]), [-4,-2]));
		assert(equal(quadraticRoots([1, 0, 0]), [0]));
		assert(equal(quadraticRoots([1,-20,100]), [10]));
		assert(equal(quadraticRoots([1,-20,101]), []));
	});
});