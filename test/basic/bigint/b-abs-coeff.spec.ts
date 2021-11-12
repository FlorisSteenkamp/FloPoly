
import { expect } from 'chai';
import { describe } from 'mocha';
import { bAbsCoeff } from '../../../src/index.js';


describe('bAbsCoeff', function() {
	it('change all coeffients to their absolute values for some polynomials with bigint coefficients', 
	function() {
		let p1: bigint[] = [];
		let p2 = [-2n,3n];
		let p3 = [-3n,-2n,-1n];
		expect(bAbsCoeff(p1)).to.eql([]);
		expect(bAbsCoeff(p2)).to.eql([2n,3n]);
		expect(bAbsCoeff(p3)).to.eql([3n,2n,1n]);
	});
});