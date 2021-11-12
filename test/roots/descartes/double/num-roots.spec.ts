
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { numRoots } from '../../../../src/index.js';


describe('numRoots', function() {
	it('should correctly calculate the number of roots of some polynomials',
	function() {
		{
			let p = [1, 1, -64, 236, -240];
			expect(numRoots(p)).to.equal(4);
		}
	});
});


