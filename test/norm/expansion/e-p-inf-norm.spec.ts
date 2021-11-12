
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { ePInfNorm } from '../../../src/index.js';


describe('ePInfNorm', function() {
	it('should correctly calculate the infinity norm of some polynomials', 
	function() {
        let p0: number[][] = [];
		let p1 = [[1e-10],[-1e-12],[1]];
		let p2 = [[-1e-3],[1e-12],[1e-10]];
        let p3 = [[-1e-3],[1e-1],[1e-10]];
        expect(ePInfNorm(p0)).to.equal(0);
		expect(ePInfNorm(p1)).to.equal(1);
		expect(ePInfNorm(p2)).to.equal(1e-3);
		expect(ePInfNorm(p3)).to.equal(1e-1);
	});
});