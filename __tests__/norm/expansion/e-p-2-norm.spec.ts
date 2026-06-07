import { describe, expect, it } from '@jest/globals';

import { eP2Norm } from '../../../src/norm/expansion/e-p-2-norm.js';


describe('eP2Norm', function() {
	it('should correctly calculate the p-2 (Euclidean) norm of some polynomials', 
	function() {
		let p0: number[][] = [];
		let p1 = [[1e-10],[-1e-12],[1]];
		let p2 = [[-1e-3],[1e-12],[1e-10]];
		let p3 = [[-1e-3],[1e-1],[1e-10]];
		expect(eP2Norm(p0)).toEqual(0);
		expect(eP2Norm(p1)).toEqual(Math.sqrt(1e-10**2 + (-1e-12)**2 + 1**2));
		expect(eP2Norm(p2)).toEqual(Math.sqrt((-1e-3)**2 + 1e-12**2 + 1e-10**2));
		expect(eP2Norm(p3)).toEqual(Math.sqrt((-1e-3)**2 + 1e-1**2 + 1e-10**2));
	});
});