
import { expect } from 'chai';
import { describe } from 'mocha';
import { bDegree } from '../../../src/index.js';


describe('degree', function() {
	it('should report the correct degree for some polynomials with bigint coefficients', 
	function() {
		expect(bDegree([])).to.equal(-1);
		expect(bDegree([1n])).to.equal(0);
		expect(bDegree([5n,4n,3n,2n,1n])).to.equal(4);
		expect(bDegree([5n,0n,0n,0n,0n])).to.equal(4);
	});
});