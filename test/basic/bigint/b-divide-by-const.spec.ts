
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bDivideByConst } from '../../../src/index.js';


describe('bDivideByConst', function() {
	it('should correctly divide (integer division) some polynomials with bigint coefficients by a constant', 
	function() {
		let p1: bigint[] = [];
        let p2 = [1n,2n,3n,4n];
		expect(bDivideByConst(p1,2n)).to.eql([]);
        expect(bDivideByConst(p2,2n)).to.eql([0n,1n,1n,2n]);
    });
});