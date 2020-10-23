
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { numRootsInRange } from '../../../../src/index';


describe('numRootsInRange', function() {
	it('should correctly calculate the number of roots within an interval for some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240]; // roots at 2, 3, 4, -10
			expect(numRootsInRange(p,-20,-11)).to.equal(0);
			expect(numRootsInRange(p,-11,-9)).to.equal(1);    
			expect(numRootsInRange(p,-11,3.5)).to.equal(3); 
			expect(numRootsInRange(p,-11,5)).to.equal(4);   

			expect(numRootsInRange(p,-10.00000000001,-9.99999999999)).to.equal(1);
		}
	});
});
