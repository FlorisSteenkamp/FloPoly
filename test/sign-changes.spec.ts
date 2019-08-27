
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { degree, equal, differentiate, signChanges } from '../src/index';


describe('signChanges', function() {
	it('should correctly calculate the number of sign changes of some polynomials', 
	function() {
		let p = [1,2,-3,0,0,3,-1];
		
		expect(signChanges(p)).to.equal(3);
	});
});