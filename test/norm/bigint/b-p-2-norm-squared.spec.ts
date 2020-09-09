
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bP2NormSquared } from '../../../src/index';


describe('bP2NormSquared', function() {
	it('should correctly calculate the p-2 (Euclidean) norm squared of some polynomials', 
	function() {
        let p0: bigint[] = [];
		let p1 = [-10n,-12n,1n];
        let p2 = [-3n,-12n,-10n];
        expect(bP2NormSquared(p0)).to.equal(0n);
		expect(bP2NormSquared(p1)).to.equal(245n);
		expect(bP2NormSquared(p2)).to.equal(253n);
	});
});