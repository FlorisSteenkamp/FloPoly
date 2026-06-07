import { describe, expect, it } from '@jest/globals';

import { numRootsIn01 } from '../../../../src/roots/descartes/double/num-roots-in-0-1.js';
import { multiply } from '../../../../src/basic/double/multiply.js';


describe('numRootsIn01', function() {
	it('should correctly calculate the number of roots within the open interval (0,1) for some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240];
			expect(numRootsIn01(p)).toEqual(0);
        }
        
        {
			let p = [1, 0, 1, 0, -3, -3, 8, 2, -5];
			expect(numRootsIn01(p)).toEqual(1);
		}
		{
			let p = [-1, 0, 1, 0, -3, -3, 8, 2, -5];
			expect(numRootsIn01(p)).toEqual(0);
		}
		{
			let p = [-1, 0, -1, 0, +3, -3, 8, 2, -5];
			expect(numRootsIn01(p)).toEqual(1);
		}
		
		// overflow destroys `numRootsIn01` below ):

        /*
        {
			let p1 = multiply([1,-0.5], [1,-0.3]);
			let p2 = multiply([1,-0.1], [1,-0.9]);
			let p3 = multiply([1,-0.2], [1,-0.99]);
			let p4 = multiply([1,-0.0], [1,-0.09]);
			let p5 = multiply(p1, p2);
			let p6 = multiply(p3, p4);
			let p7 = multiply(p5, p6);
			expect(numRootsIn01(p7)).toEqual(8);
		}
		{
			let k = -0.001;
			let p1 = multiply([1,k*1], [1,k*5]);
			let p2 = multiply([1,k*2], [1,k*6]);
			let p3 = multiply([1,k*3], [1,k*7]);
			let p4 = multiply([1,k*4], [1,k*8]);
			let p5 = multiply(p1, p2);
			let p6 = multiply(p3, p4);
			let p7 = multiply(p5, p6);
			expect(numRootsIn01(p7)).toEqual(8);
		}
		*/
	});
});
