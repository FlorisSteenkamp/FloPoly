
import { assert } from 'chai';
import { describe } from 'mocha';
import { equal, deflate } from '../src/index';


describe('deflate', function() {
	it('should correctly deflate some polynomials', 
	function() {
		let p1 = [1, -5, 8, -4];
		let r1 = 2;
		let p2 = [1, -3, 2];
		let r2 = 2;
		let p3 = [1, -1];
		let r3 = 1;
		assert(equal(deflate(p1, r1), [1, -3, 2]));   
		assert(equal(deflate(p2, r2), [1,-1]));
		assert(equal(deflate(p3, r3), [1]));
	});
});
