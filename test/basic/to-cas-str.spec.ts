
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { toCasStr } from '../../src/index';


describe('toCasStr', function() {
	const casStr1 = " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1";
	const casStr2 = " - 5*x^4 + 4*x^3 - 3*x^2 + 2*x + 1";
	it('should correctly transform some polynomials into a human/CAS readable form (double precision coefficients)', 
	function() {
		let p1 = [5,4,3,2,1];
		let p2 = [-5,4,-3,2,1];
		expect(toCasStr(p1)).to.equal(casStr1); 
		expect(toCasStr(p2)).to.equal(casStr2); 


		const casStr3 = ' + 23333333331231290000000000*x + 31496033330495934000000000';
		const casStr4 = ' - 23333333331231290000000000*x + 31496033330495934000000000';
		let p3 = [23333333331231290809823333.342, 3.149603333049593e+25]
		let p4 = [-23333333331231290809823333.342, 3.149603333049593e+25]
		expect(toCasStr(p3)).to.equal(casStr3);
		expect(toCasStr(p4)).to.equal(casStr4);


		const casStr5 = ' + 0.00000000000000000000000005784985714806871*x + 0.00000000000000000000000007138672372071679';
		const casStr6 = ' - 0.00000000000000000000000005784985714806871*x - 0.00000000000000000000000007138672372071679';
		let p5 = [5.78498571480687e-26, 7.138672372071678e-26]
		let p6 = [-5.78498571480687e-26, -7.138672372071678e-26]
		expect(toCasStr(p5)).to.equal(casStr5);
		expect(toCasStr(p6)).to.equal(casStr6);
	});

	it('should correctly transform some polynomials into a human/CAS readable form (expansion precision coefficients)', 
	function() {
		let p1 = [[5],[4],[3],[2],[1]];
		let p2 = [[-5],[4],[-3],[2],[1]];
		
		expect(toCasStr(p1)).to.equal(casStr1);
		expect(toCasStr(p2)).to.equal(casStr2);
	});

	it('should correctly transform some polynomials into a human/CAS readable form (bigint coefficients)', 
	function() {
		let p1 = [5n,4n,3n,2n,1n];
		let p2 = [-5n,4n,-3n,2n,1n];
		
		expect(toCasStr(p1)).to.equal(casStr1); 
		expect(toCasStr(p2)).to.equal(casStr2); 
	});
	
});