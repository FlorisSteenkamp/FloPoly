
import { assert } from 'chai';
import { describe } from 'mocha';
import { equal, clip0 } from '../src/index';


describe('clip0', function() {
	it('should clip some polynomials correctly', 
	function() {
		let p1 = [   0, 1e-10, 1e-5];
		let p2 = [0, 0, 1e-10, 1e-5];
		
		assert(equal(clip0(p1), [1e-10, 1e-5])); 
		assert(equal(clip0(p2), [1e-10, 1e-5]));
	});
});