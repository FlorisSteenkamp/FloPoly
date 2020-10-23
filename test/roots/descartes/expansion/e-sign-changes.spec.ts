
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eSignChanges, toCasStr } from '../../../../src/index';


describe('eSignChanges', function() {
	it('should correctly calculate the number of sign changes of some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1 = [[1],[2],[-3],[0],[0],[3],[-1]];
		let p2: number[][] = [];
		
		let r1 = eSignChanges(p1);
		expect(r1).to.equal(
			3, 
			`sign changes of ${toCasStr(p1)} must equal 3 but equals ${r1}`
		);

		let r2 = eSignChanges(p2);
		expect(eSignChanges(p2)).to.equal(
			0,
			`sign changes of ${toCasStr(p2)} must equal 0 but equals ${r2}`
		);
	});
});
