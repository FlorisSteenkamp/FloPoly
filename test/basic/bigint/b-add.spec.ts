
import { expect } from 'chai';
import { describe } from 'mocha';
import { bAdd } from '../../../src/index';


describe('bAdd', function() {
	it('should add some polynomials with bigint coefficients correctly', 
	function() {
		let p1 = [3n,4n];
		let p2 = [1n,2n,3n];
		let p3 = [3n,2n,1n];
		expect(bAdd(p1,p2)).to.eql([1n,5n,7n]);
		expect(bAdd(p2,p1)).to.eql([1n,5n,7n]);
		expect(bAdd(p3,p2)).to.eql([4n,4n,4n]);
	});
});