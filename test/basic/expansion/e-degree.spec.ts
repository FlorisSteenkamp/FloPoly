
import { expect } from 'chai';
import { describe } from 'mocha';
import { eDegree } from '../../../src/index';


describe('eDegree', function() {
	it('should report the correct degree for some polynomials with Shewchuk expansion coefficients', 
	function() {
		expect(eDegree([])).to.equal(-1);
		expect(eDegree([[1]])).to.equal(0);
		expect(eDegree([[5],[4],[3],[2],[1]])).to.equal(4);
		expect(eDegree([[5],[0],[0],[0],[0]])).to.equal(4);
	});
});