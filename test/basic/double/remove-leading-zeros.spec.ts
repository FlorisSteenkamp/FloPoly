
import { expect } from 'chai';
import { describe } from 'mocha';
import { removeLeadingZeros } from '../../../src/index.js';


describe('removeLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with double precision coefficients', 
	function() {
		let p1 = [0, 1e-10, 1e-5];
		let p2 = [0, 0, 1e-10, 1e-1];
		let p3: number[] = [];
		let p4 = [0,0,0,0];
		
		expect(removeLeadingZeros(p1)).to.eql([1e-10, 1e-5]); 
		expect(removeLeadingZeros(p2)).to.eql([1e-10, 1e-1]);
		expect(removeLeadingZeros(p3)).to.eql([]);
		expect(removeLeadingZeros(p4)).to.eql([]);
	});
});