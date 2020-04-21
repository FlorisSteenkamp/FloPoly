
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { degree, equal, differentiate } from '../../src/index';


describe('differentiate', function() {
	it('should differentiate some polynomials correctly', 
	function() {
		let p = [5, 4, 3, 2, 1];
		assert(equal(differentiate(p), [20, 12, 6, 2]));
	});
});