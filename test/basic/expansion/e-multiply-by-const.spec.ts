
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eMultiplyByConst } from '../../../src/index.js';


describe('eMultiplyByConst', function() {
	it('should correctly multiply some polynomials with Shewchuk expansion coefficients by a constant', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1.1],[2.2],[3.3],[4.4]];
		let c = [2];
		expect(
			eMultiplyByConst(c,p1)).to.eql([],
			`n: ${c}, d: ${p1}`
		);
		expect(
			eMultiplyByConst(c,p2)).to.eql(
				[[2.2],[4.4],[6.6],[8.8]],
				`n: ${c}, d: ${p2}`
			);
	});
	
	
	it('should return the zero polynomial if the polynomial was multiplied by 0', 
	function() {
		let p1 = [[1.1],[2.2],[3.3],[4.4]];
		let c = [0];
		expect(
			eMultiplyByConst(c,p1)).to.eql([],
			`n: ${c}, d: ${p1}`
		);
	});
});