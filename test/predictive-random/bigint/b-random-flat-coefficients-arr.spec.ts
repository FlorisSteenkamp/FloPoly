
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bFlatCoefficientsArr } from '../../../src/index';


describe('random.bFlatCoefficientsArr', function() {
	it('should predictably generate an array of polynomials with coefficients in a flat random distribution', 
	function() {
		let res: bigint[][];
		let expected1 = [23476909n, -27312416n, 125838304n];
		let expected2 = [4453383n, -7934801n, 3372311n];
		
		res = bFlatCoefficientsArr(2,3,-2,2);
		
		assert(bEqual(res[0], expected1), `res[0]: ${res[0]}, expected: ${expected1}`);
		assert(bEqual(res[1], expected2), `res[1]: ${res[1]}, expected: ${expected2}`);
		
		res = bFlatCoefficientsArr(2,3,-2,2);
		assert(bEqual(res[0], expected1), `res[0]: ${res[0]}, expected: ${expected1}`);
		assert(bEqual(res[1], expected2), `res[1]: ${res[1]}, expected: ${expected2}`);
	});
});