import { describe, expect, it } from '@jest/globals';
import { reflectAboutYAxis } from '../../../src/change-variables/double/reflect-about-y-axis.js';
import { equal } from '../../../src/basic/double/equal.js';


describe('reflectAboutYAxis', function() {
	it('should correctly reflect some polynomials with double precision coefficients about the y axis', 
	function() {
		{
			const p: number[] = [];
			expect(equal(reflectAboutYAxis(p), [])).toBeTruthy();
		}
		{
			const p: number[] = [1];
			expect(equal(reflectAboutYAxis(p), [1])).toBeTruthy();
		}
		{
			const p: number[] = [2,1];
			expect(equal(reflectAboutYAxis(p), [-2,1])).toBeTruthy();
		}
		{
			const p = [5,4,3,2,1];
			expect(equal(reflectAboutYAxis(p), [5,-4,3,-2,1])).toBeTruthy();
		}
		{
			const p = [4,3,2,1];
			expect(equal(reflectAboutYAxis(p), [-4,3,-2,1])).toBeTruthy();
		}
	});
});


// if (i % 2 === (d - 1) % 2)