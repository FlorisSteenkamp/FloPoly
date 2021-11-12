
import { expect } from 'chai';
import { describe } from 'mocha';
import { eRemoveLeadingZeros } from '../../../src/index.js';


describe('eRemoveLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with Shewchuk expansion coefficients', 
	function() {
		let p1 = [[0], [1e-10], [1e-5]];
		let p2 = [[0], [0], [1e-10], [1e-1]];
		let p3: number[][] = [];
		let p4 = [[0],[0],[0],[0]];
		
		expect(eRemoveLeadingZeros(p1)).to.eql([[1e-10], [1e-5]]); 
		expect(eRemoveLeadingZeros(p2)).to.eql([[1e-10], [1e-1]]);
		expect(eRemoveLeadingZeros(p3)).to.eql([]);
		expect(eRemoveLeadingZeros(p4)).to.eql([]);
	});
});