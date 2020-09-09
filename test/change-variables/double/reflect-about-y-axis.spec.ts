
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, reflectAboutYAxis } from '../../../src/index';


describe('reflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with double precision coefficients about the y axis', 
	function() {
		let p1: number[] = [];
		let p2 = [5,4,3,2,1];
		assert(equal(reflectAboutYAxis(p1), []));
		assert(equal(reflectAboutYAxis(p2), [5,-4,3,-2,1]));
	});
});