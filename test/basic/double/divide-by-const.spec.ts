
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { divideByConst } from '../../../src/index.js';


describe('divideByConst', function() {
	it('should correctly divide some polynomials with double precision coefficients by a constant', 
	function() {
		let p1: number[] = [];
        let p2 = [1.1,2.2,3.3,4.4];
        let inf = Number.POSITIVE_INFINITY;
		expect(divideByConst(p1,2)).to.eql([]);
        expect(divideByConst(p2,2)).to.eql([0.55,1.1,1.65,2.2]);
        expect(divideByConst(p2,0)).to.eql([inf,inf,inf,inf]);
	});
});