
import { expect } from 'chai';
import { describe } from 'mocha';
import { approxRemoveLeadingZeros, removeLeadingZeros } from '../../src/index';


describe('clip', function() {
	/*
	it('should clip some polynomials correctly when δ is not specified', 
	function() {
		let p1 = [1e-18, 1e-10, 1e-5];
		let p2 = [1e-18, 1e-10, 1e-1];
		
		expect(approxRemoveLeadingZeros(p1)).to.eql([1e-10, 1e-5]); 
		expect(approxRemoveLeadingZeros(p2)).to.eql([1e-10, 1e-1]);
	});
	
	
	it('should clip some polynomials correctly when δ is specified', 
	function() {
		let p1 = [1e-18, 1e-10, 1e-8];
		let p2 = [1e-18, 1e-10, 1e-1];
		let δ: number;
		
		δ = 1e-3;
		expect(approxRemoveLeadingZeros(p1,δ)).to.eql([1e-10, 1e-8]); 
		expect(approxRemoveLeadingZeros(p2,δ)).to.eql([1e-1]);
		
		let p3 = [1, 10, 10, 1e6, 1e6]; 
		δ = 1e-2;
		expect(approxRemoveLeadingZeros(p3,δ)).to.eql([1e6, 1e6]);
		
		expect(approxRemoveLeadingZeros([])).to.eql([]);
	});
	*/
});