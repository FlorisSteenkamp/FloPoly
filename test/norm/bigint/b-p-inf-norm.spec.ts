
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bPInfNorm } from '../../../src/index';


describe('bPInfNorm', function() {
	it('should correctly calculate the infinity norm of some polynomials', 
	function() {
        let p0: bigint[] = [];
		let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bPInfNorm(p0)).to.equal(0n);
		expect(bPInfNorm(p1)).to.equal(12n);
		expect(bPInfNorm(p2)).to.equal(12n);
	});
});