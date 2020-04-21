
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, negate } from '../../src/index';


describe('negate', function() {
	it('should correctly negate some polynomials', 
	function() {
		let p1 = [0.1, -0.2];
		assert(equal(negate(p1), [-0.1, 0.2]));
	});
});