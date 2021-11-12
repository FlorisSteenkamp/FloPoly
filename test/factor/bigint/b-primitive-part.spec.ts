
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bPrimitivePart } from '../../../src/index.js';


describe('bPrimitivePart', function() {
	it('should calculate the correct primitive part of some polynomials', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
        let p3 = [-10n, 5n, 5n]; //=> pp(p3) = pp(-10x² + 5x + 5) = 2x² - 1x - 1
        let p4 = [10n, 5n, 5n];  //=> pp(p4) = pp( 10x² + 5x + 5) = 2x² + 1x + 1
		expect(bPrimitivePart(p1)).to.eql([]);
		expect(bPrimitivePart(p2)).to.eql([1n]);
        expect(bPrimitivePart(p3)).to.eql([2n,-1n,-1n]);
        expect(bPrimitivePart(p4)).to.eql([2n,1n,1n]);
	});
});

