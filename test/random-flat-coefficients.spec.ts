
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, flatCoefficients } from '../src/index';


describe('random.flatCoefficients', function() {
	it('should predictably generate a polynomial with coefficients in a flat random distribution', 
	function() {
		let res;
		
		res = flatCoefficients(3,-5,5); 
		assert(equal(res.p, [0.437291506677866, -0.5087333917617798, 2.3439210653305054]));
		expect(res.seed).to.equal(939629312);
		
		res = flatCoefficients(3,-5,5); 
		assert(equal(res.p, [0.437291506677866, -0.5087333917617798, 2.3439210653305054]));
		expect(res.seed).to.equal(939629312);
		
		res = flatCoefficients(3); // Uses default range 
		assert(equal(res.p, [0.0874583013355732, -0.10174667835235596, 0.4687842130661011]));
		expect(res.seed).to.equal(939629312);
	});
});
