
import { expect } from 'chai';
import { describe } from 'mocha';
import { add } from '../../../src/index.js';


describe('add', function() {
	it('should add some polynomials with double precision coefficients correctly', 
	function() {
		let p1 = [3,4];
		let p2 = [1,2,3];
		let p3 = [3,2,1];
		expect(add(p1,p2)).to.eql([1,5,7]);
		expect(add(p2,p1)).to.eql([1,5,7]);
		expect(add(p3,p2)).to.eql([4,4,4]);
	});
});