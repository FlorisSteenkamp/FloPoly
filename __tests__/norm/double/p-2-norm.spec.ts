import { describe, expect, it } from '@jest/globals';

import { p2Norm } from '../../../src/norm/double/p-2-norm.js';


describe('p2Norm', function() {
	it('should correctly calculate the p-2 (Euclidean) norm of some polynomials', 
	function() {
		let p0: number[] = [];
		let p1 = [1e-10,-1e-12,1];
		let p2 = [-1e-3,1e-12,1e-10];
		let p3 = [-1e-3,1e-1,1e-10];
		expect(p2Norm(p0)).toEqual(0);
		expect(p2Norm(p1)).toEqual(Math.sqrt(1e-10**2 + (-1e-12)**2 + 1**2));
		expect(p2Norm(p2)).toEqual(Math.sqrt((-1e-3)**2 + 1e-12**2 + 1e-10**2));
		expect(p2Norm(p3)).toEqual(Math.sqrt((-1e-3)**2 + 1e-1**2 + 1e-10**2));
	});
});