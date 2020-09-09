
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { signChanges } from '../../../../src/index';


describe('signChanges', function() {
	it('should correctly calculate the number of sign changes of some polynomials with double precision coefficients', 
	function() {
		let p1 = [1,2,-3,0,0,3,-1];
		let p2: number[] = [];
		
		expect(signChanges(p1)).to.equal(3);
		expect(signChanges(p2)).to.equal(0);
	});
});