
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { p1Norm } from '../../../src/index.js';


describe('p1Norm', function() {
	it('should correctly calculate the p-1 norm of some polynomials', 
	function() {
		let p0: number[] = [];
		let p1 = [1e-10,-1e-12,1];
		let p2 = [-1e-3,1e-12,1e-10];
		let p3 = [-1e-3,1e-1,1e-10];
		expect(p1Norm(p0)).to.equal(0);
		expect(p1Norm(p1)).to.equal(1e-10 + 1e-12 + 1);
		expect(p1Norm(p2)).to.equal(1e-3 + 1e-12 + 1e-10);
		expect(p1Norm(p3)).to.equal(1e-3 + 1e-1 + 1e-10);
	});
});