
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

		let expected3 = [
			[291912365n, 241123040n, 394273760n, 410943712n, 14521824n],
  			[11760919n, 15009599n, 5934375n, 4776143n, 15289399n]
		];
		res = bFlatCoefficientsArr(2,5);
		assert(bEqual(res[0], expected3[0]), `res[0]: ${res[0]}, expected: ${expected3[0]}`);
		assert(bEqual(res[1], expected3[1]), `res[1]: ${res[1]}, expected: ${expected3[1]}`);
	});
});