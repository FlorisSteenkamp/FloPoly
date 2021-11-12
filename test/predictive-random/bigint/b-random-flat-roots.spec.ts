
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bFlatRoots } from '../../../src/index.js';


describe('random.bFlatRoots', function() {
	it('should predictably generate a polynomial with Roots in a flat random distribution', 
	function() {
		let res: { p: bigint[], seed: number };
		
		res = bFlatRoots(3,0,10); 
		assert(bEqual(res.p, [
			35184372088832n,
			-607721334374400n,
			3424666384336699n,
			-6309998537583521n
		]));
		expect(res.seed).to.equal(939629312);
		
		res = bFlatRoots(3,0,10); 
		assert(bEqual(res.p, [
			35184372088832n,
			-607721334374400n,
			3424666384336699n,
			-6309998537583521n
		]));
		expect(res.seed).to.equal(939629312);
		
		res = bFlatRoots(3); // Uses defaults for range
		assert(bEqual(res.p, [
			18014398509481984n,
			-31115332319969280n,
			17534291887803900n,
			-3230719251242763n
		]));
		expect(res.seed).to.equal(939629312);
	});
});