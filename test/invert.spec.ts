
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, invert } from '../src/index';

describe('invert', function() {
	it('should correctly invert some polynomials', 
	function() {
		let p = [4,3,2,1];
		assert(equal(invert(p), [1,2,3,4]));
	});
});