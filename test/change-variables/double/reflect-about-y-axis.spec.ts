import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { reflectAboutYAxis } from '../../../src/change-variables/double/reflect-about-y-axis.js';
import { equal } from '../../../src/basic/double/equal.js';


describe('reflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with double precision coefficients about the y axis', 
	function() {
		{
			const p: number[] = [];
			assert(equal(reflectAboutYAxis(p), []));
		}
		{
			const p: number[] = [1];
			assert(equal(reflectAboutYAxis(p), [1]));
		}
		{
			const p: number[] = [2,1];
			assert(equal(reflectAboutYAxis(p), [-2,1]));
		}
		{
			const p = [5,4,3,2,1];
			assert(equal(reflectAboutYAxis(p), [5,-4,3,-2,1]));
		}
		{
			const p = [4,3,2,1];
			assert(equal(reflectAboutYAxis(p), [-4,3,-2,1]));
		}
	});
});


// if (i % 2 === (d - 1) % 2)