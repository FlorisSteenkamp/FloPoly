
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eNumRoots } from '../../../../src/index.js';


describe('eNumRoots', function() {
	it('should correctly calculate the number of roots of some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(x => [x]);
			expect(eNumRoots(p)).to.equal(4);
		}
	});
});
