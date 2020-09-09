
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bNumRoots } from '../../../../src/index';


describe('bNumRoots', function() {
	it('should correctly calculate the number of roots of some polynomials',
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(BigInt);;
			expect(bNumRoots(p)).to.equal(4);
		}
	});
});


