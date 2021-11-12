
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bP1Norm } from '../../../src/index.js';


describe('bP1Norm', function() {
	it('should correctly calculate the p-1 norm of some polynomials', 
	function() {
        let p0: bigint[] = [];
		let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bP1Norm(p0)).to.equal(0n);
		expect(bP1Norm(p1)).to.equal(23n);
		expect(bP1Norm(p2)).to.equal(25n);
	});
});