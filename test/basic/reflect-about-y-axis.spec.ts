
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, reflectAboutYAxis } from '../../src/index';


describe('reflectAboutYAxis', function() {
	it('should correctly reflect some polynomials about the y axis', 
	function() {
		let p = [5,4,3,2,1];

		assert(equal(reflectAboutYAxis(p), [5,-4,3,-2,1]));
	});
});