
import { expect } from 'chai';
import { describe } from 'mocha';
import { bRemoveLeadingZeros } from '../../../src/index.js';


describe('bRemoveLeadingZeros', function() {
	it('should correctly remove leading zeros of some polynomials with bigint coefficients', 
	function() {
		let p1 = [0n, 10n, -5n];
		let p2 = [0n, 0n, -10n, 1n];
		let p3: bigint[] = [];
		let p4 = [0n,0n,0n,0n];
		
		expect(bRemoveLeadingZeros(p1)).to.eql([10n, -5n]); 
		expect(bRemoveLeadingZeros(p2)).to.eql([-10n, 1n]);
		expect(bRemoveLeadingZeros(p3)).to.eql([]);
		expect(bRemoveLeadingZeros(p4)).to.eql([]);
	});
});