
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bFlatCoefficients } from '../../../src/index';


describe('random.bFlatCoefficients', function() {
	it('should predictably generate a polynomial with coefficients in a flat random distribution', 
	function() {
		let res: { p: bigint[]; seed: number; };
		
		res = bFlatCoefficients(3,-5,5); 
		assert(bEqual(res.p, [117384545n, -136562080n, 629191520n]));
		assert(res.seed === 939629312);
		
		res = bFlatCoefficients(3,-5,5); 
		assert(bEqual(res.p, [117384545n, -136562080n, 629191520n]));
		assert(res.seed === 939629312);
		
		res = bFlatCoefficients(3); // Uses default range 
		assert(bEqual(res.p, [291912365n, 241123040n, 394273760n]));
		assert(res.seed === 939629312);
	});
});
