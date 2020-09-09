
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bContent } from '../../../src/index';


describe('bContent', function() {
	it('should calculate the correct content of some polynomials', 
	function() {
		let p1: bigint[] = [];
		let p2 = [1n];
        let p3 = [-10n, 5n, 5n]; //=> cont(p3) = cont(-10x² + 5x + 5) = -5
        let p4 = [10n, 5n, 5n];  //=> cont(p4) = cont( 10x² + 5x + 5) =  5
		expect(bContent(p1)).to.eql(1n);
		expect(bContent(p2)).to.eql(1n);
        expect(bContent(p3)).to.eql(-5n);
        expect(bContent(p4)).to.eql(5n);
	});
});

