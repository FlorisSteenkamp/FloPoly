
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { p2Norm } from '../../../src/index.js';


describe('p2Norm', function() {
	it('should correctly calculate the p-2 (Euclidean) norm of some polynomials', 
	function() {
		let p0: number[] = [];
		let p1 = [1e-10,-1e-12,1];
		let p2 = [-1e-3,1e-12,1e-10];
		let p3 = [-1e-3,1e-1,1e-10];
		expect(p2Norm(p0)).to.equal(0);
		expect(p2Norm(p1)).to.equal(Math.sqrt(1e-10**2 + (-1e-12)**2 + 1**2));
		expect(p2Norm(p2)).to.equal(Math.sqrt((-1e-3)**2 + 1e-12**2 + 1e-10**2));
		expect(p2Norm(p3)).to.equal(Math.sqrt((-1e-3)**2 + 1e-1**2 + 1e-10**2));
	});
});