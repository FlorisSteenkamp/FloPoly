
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bNumRootsIn01, toCasStr, multiply, scaleFloatsToBigints } from '../../../../src/index.js';


describe('bNumRootsIn01', function() {
	it('should correctly calculate the number of roots within the open interval (0,1) for some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(BigInt);
			expect(
				bNumRootsIn01(p)).to.equal(0,
				`p: ${toCasStr(p)}`
			);
        }
        
        {
			let p = [1, 0, 1, 0, -3, -3, 8, 2, -5].map(BigInt);
			expect(
				bNumRootsIn01(p)).to.equal(1,
				`p: ${toCasStr(p)}`
			);
		}
		{
			let p = [-1, 0, 1, 0, -3, -3, 8, 2, -5].map(BigInt);
			expect(
				bNumRootsIn01(p)).to.equal(0,
				`p: ${toCasStr(p)}`
			);
		}
		{
			let p = [-1, 0, -1, 0, +3, -3, 8, 2, -5].map(BigInt);
			expect(
				bNumRootsIn01(p)).to.equal(1,
				`p: ${toCasStr(p)}`
			);
        }
        
        {
			let p1 = multiply([1,-0.5], [1,-0.3]);
			let p2 = multiply([1,-0.1], [1,-0.9]);
			let p3 = multiply([1,-0.2], [1,-0.99]);
			let p4 = multiply([1,-0.0], [1,-0.09]);
			let p5 = multiply(p1, p2);
			let p6 = multiply(p3, p4);
			let p7 = multiply(p5, p6);
			//console.log(p7)
			let p8 = scaleFloatsToBigints(p7);
			expect(
				bNumRootsIn01(p8)).to.equal(8,
				`p: ${toCasStr(p8)}`
			);
		}
		{
			let k = -0.001;
			let p1 = multiply([1,k*1], [1,k*5]);
			let p2 = multiply([1,k*2], [1,k*6]);
			let p3 = multiply([1,k*3], [1,k*7]);
			let p4 = multiply([1,k*4], [1,k*8]);
			let p5 = multiply(p1, p2);
			let p6 = multiply(p3, p4);
			let p7 = scaleFloatsToBigints(multiply(p5, p6));
			expect(
				bNumRootsIn01(p7)).to.equal(8,
				`p: ${toCasStr(p7)}`
			);
		}
	});
});
