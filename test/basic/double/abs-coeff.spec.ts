
import { expect } from 'chai';
import { describe } from 'mocha';
import { absCoeff } from '../../../src/index';


describe('absCoeff', function() {
	it('change all coeffients to their absolute values for some polynomials with double precision coefficients', 
	function() {
		let p1: number[] = [];
		let p2 = [-2,3];
		let p3 = [-3,-2,-1];
		expect(absCoeff(p1)).to.eql([]);
		expect(absCoeff(p2)).to.eql([2,3]);
		expect(absCoeff(p3)).to.eql([3,2,1]);
	});
});