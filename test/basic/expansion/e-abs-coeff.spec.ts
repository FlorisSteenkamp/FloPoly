
import { expect } from 'chai';
import { describe } from 'mocha';
import { eAbsCoeff } from '../../../src/index';


describe('eAbsCoeff', function() {
	it('change all coeffients to their absolute values for some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1: number[][] = [];
		let p2 = [[-2],[3]];
		let p3 = [[-3],[-2],[-1]];
		expect(eAbsCoeff(p1)).to.eql([]);
		expect(eAbsCoeff(p2)).to.eql([[2],[3]]);
		expect(eAbsCoeff(p3)).to.eql([[3],[2],[1]]);
	});
});