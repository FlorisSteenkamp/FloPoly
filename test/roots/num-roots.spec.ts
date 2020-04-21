
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { numRootsInRange, numRootsInRangeExact, multiply } from '../../src/index';
//import { numRootsExact, numRootsIn01Exact } from '../../src/roots/num-roots';
import { multiplyExact } from '../../src/basic/multiply';


describe('numRoots', function() {
	/*
	it('should approximately calculate the number of roots within an interval for some polynomials', 
	function() {
		let p = [1, 1, -64, 236, -240]; // roots at 2, 3, 4, -10
		expect(numRootsInRange(p,-20,-11)).to.equal(0);
		expect(numRootsInRange(p,-11,-9)).to.equal(1);    
		expect(numRootsInRange(p,-11,3.5)).to.equal(3); 
		expect(numRootsInRange(p,-11,5)).to.equal(4);   

		expect(numRootsInRange(p,-10.00000000001,-9.99999999999)).to.equal(1);
	});
	*/
	it('should exactly calculate the number of roots', 
	function() {
		/*
		{
			let p = [1, 1, -64, 236, -240].map(x => [x]);
			expect(numRootsInRangeExact(p,[-20],[-11])).to.equal(0);
			expect(numRootsInRangeExact(p,[-11],[-9])).to.equal(1);    
			expect(numRootsInRangeExact(p,[-11],[3.5])).to.equal(3); 
			expect(numRootsInRangeExact(p,[-11],[5])).to.equal(4);   
			expect(numRootsInRangeExact(p,[-10.00000000001],[-9.99999999999])).to.equal(1);

			expect(numRootsExact(p)).to.equal(4);

			expect(numRootsIn01Exact(p)).to.equal(0);
		}

		{
			let p = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
			expect(numRootsIn01Exact(p)).to.equal(1);
		}
		{
			let p = [[-1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
			expect(numRootsIn01Exact(p)).to.equal(0);
		}
		{
			let p = [[-1], [0], [-1], [0], [+3], [-3], [8], [2], [-5]];
			expect(numRootsIn01Exact(p)).to.equal(1);
		}
		{
			let p1 = multiplyExact([[1],[-0.5]], [[1],[-0.3]]);
			let p2 = multiplyExact([[1],[-0.1]], [[1],[-0.9]]);
			let p3 = multiplyExact([[1],[-0.2]], [[1],[-0.99]]);
			let p4 = multiplyExact([[1],[-0.01]], [[1],[-0.09]]);
			let p5 = multiplyExact(p1, p2);
			let p6 = multiplyExact(p3, p4);
			let p7 = multiplyExact(p5, p6);
			expect(numRootsIn01Exact(p7)).to.equal(8);
		}
		{
			let k = -0.001;
			let p1 = multiplyExact([[1],[k*1]], [[1],[k*5]]);
			let p2 = multiplyExact([[1],[k*2]], [[1],[k*6]]);
			let p3 = multiplyExact([[1],[k*3]], [[1],[k*7]]);
			let p4 = multiplyExact([[1],[k*4]], [[1],[k*8]]);
			let p5 = multiplyExact(p1, p2);
			let p6 = multiplyExact(p3, p4);
			let p7 = multiplyExact(p5, p6);
			expect(numRootsIn01Exact(p7)).to.equal(8);
		}
		*/

		{
			
		}
	});
});
