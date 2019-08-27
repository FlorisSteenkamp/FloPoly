
import { expect } from 'chai';
import { describe } from 'mocha';
import { degree } from '../src/index';


describe('degree', function() {
	it('should report the correct degree for some polynomials', 
	function() {
		expect(degree([])).to.equal(-1);
		expect(degree([1])).to.equal(0);
		expect(degree([5,4,3,2,1])).to.equal(4);
	});
});