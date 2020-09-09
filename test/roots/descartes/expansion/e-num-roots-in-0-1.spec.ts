
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eMultiply, eNumRootsIn01 } from '../../../../src/index';

/*
describe('eNumRootsIn01', function() {
	it('should correctly calculate the number of roots within the open interval (0,1) for some polynomials', 
	function() {
		{
			let p = [1, 1, -64, 236, -240].map(x => [x]);
			expect(eNumRootsIn01(p)).to.equal(0);
        }
        
        {
			let p = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
			expect(eNumRootsIn01(p)).to.equal(1);
		}
		{
			let p = [[-1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
			expect(eNumRootsIn01(p)).to.equal(0);
		}
		{
			let p = [[-1], [0], [-1], [0], [+3], [-3], [8], [2], [-5]];
			expect(eNumRootsIn01(p)).to.equal(1);
        }
        
        {
			let p1 = eMultiply([[1],[-0.5]], [[1],[-0.3]]);
			let p2 = eMultiply([[1],[-0.1]], [[1],[-0.9]]);
			let p3 = eMultiply([[1],[-0.2]], [[1],[-0.99]]);
			let p4 = eMultiply([[1],[-0.01]], [[1],[-0.09]]);
			let p5 = eMultiply(p1, p2);
			let p6 = eMultiply(p3, p4);
			let p7 = eMultiply(p5, p6);
			expect(eNumRootsIn01(p7)).to.equal(8);
		}
		{
			let k = -0.001;
			let p1 = eMultiply([[1],[k*1]], [[1],[k*5]]);
			let p2 = eMultiply([[1],[k*2]], [[1],[k*6]]);
			let p3 = eMultiply([[1],[k*3]], [[1],[k*7]]);
			let p4 = eMultiply([[1],[k*4]], [[1],[k*8]]);
			let p5 = eMultiply(p1, p2);
			let p6 = eMultiply(p3, p4);
			let p7 = eMultiply(p5, p6);
			expect(eNumRootsIn01(p7)).to.equal(8);
		}
	});
});
*/