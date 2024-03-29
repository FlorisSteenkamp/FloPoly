
import { expect } from 'chai';
import { describe } from 'mocha';
import { degree } from '../../../src/index.js';


describe('degree', function() {
	it('should report the correct degree for some polynomials with double precision coefficients', 
	function() {
		expect(degree([])).to.equal(-1);
		expect(degree([1])).to.equal(0);
		expect(degree([5,4,3,2,1])).to.equal(4);
		expect(degree([5,0,0,0,0])).to.equal(4);
	});
});