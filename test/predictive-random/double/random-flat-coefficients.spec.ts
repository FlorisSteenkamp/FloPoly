
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, flatCoefficients } from '../../../src/index.js';


describe('random.flatCoefficients', function() {
	it('should predictably generate a polynomial with coefficients in a flat random distribution', 
	function() {
		let res: { p: number[]; seed: number; };
		let expected: number[];
		let expectedSeed = 939629312;
		
		res = flatCoefficients(3,-5,5);
		expected = [0.437291506677866, -0.5087333917617798, 2.3439210653305054];
		assert(equal(res.p, expected), `res.p: ${res.p}, expected: ${expected}`);
		assert(res.seed === 939629312, `res.seed: ${res.seed}, expectedSeed: ${expectedSeed}`);
		
		res = flatCoefficients(3,-5,5); 
		expected = [0.437291506677866, -0.5087333917617798, 2.3439210653305054];
		assert(equal(res.p, expected), `res.p: ${res.p}, expected: ${expected}`);
		assert(res.seed === 939629312, `res.seed: ${res.seed}, expectedSeed: ${expectedSeed}`);
		
		res = flatCoefficients(3); // Uses default range 
		expected = [0.0874583013355732, -0.10174667835235596, 0.4687842130661011];
		assert(equal(res.p, expected), `res.p: ${res.p}, expected: ${expected}`);
		assert(res.seed === 939629312, `res.seed: ${res.seed}, expectedSeed: ${expectedSeed}`);
	});
});
