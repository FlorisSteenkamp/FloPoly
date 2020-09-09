
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bNumRootsInRange } from '../../../../src/index';


describe('bNumRootsInRange', function() {
	it('should correctly calculate the number of roots within an interval for some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(BigInt);; // roots at 2, 3, 4, -10
			expect(bNumRootsInRange(p,-20n,-11n)).to.equal(0);
			expect(bNumRootsInRange(p,-11n,-9n)).to.equal(1);    
			expect(bNumRootsInRange(p,-11n,4n)).to.equal(3); 
			expect(bNumRootsInRange(p,-11n,5n)).to.equal(4);   

			expect(bNumRootsInRange(p,-11n,-9n)).to.equal(1);
		}
	});
});
