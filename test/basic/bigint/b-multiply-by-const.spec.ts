
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bMultiplyByConst } from '../../../src/index';


describe('bMultiplyByConst', function() {
	it('should correctly multiply some polynomials with bigint coefficients by a constant', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n,2n,3n,4n];
		expect(bMultiplyByConst(2n,p1)).to.eql([]);
		expect(bMultiplyByConst(2n,p2)).to.eql([2n,4n,6n,8n]);
	});
	
	
	it('should return the zero polynomial if the polynomial was multiplied by 0', 
	function() {
		let p1 = [1n,2n,3n,4n];
		expect(bMultiplyByConst(0n,p1)).to.eql([]);
	});
});