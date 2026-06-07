import { describe, expect, it } from '@jest/globals';

import { ePInfNorm } from '../../../src/norm/expansion/e-p-inf-norm.js';


describe('ePInfNorm', function() {
	it('should correctly calculate the infinity norm of some polynomials', 
	function() {
        let p0: number[][] = [];
		let p1 = [[1e-10],[-1e-12],[1]];
		let p2 = [[-1e-3],[1e-12],[1e-10]];
        let p3 = [[-1e-3],[1e-1],[1e-10]];
        expect(ePInfNorm(p0)).toEqual(0);
		expect(ePInfNorm(p1)).toEqual(1);
		expect(ePInfNorm(p2)).toEqual(1e-3);
		expect(ePInfNorm(p3)).toEqual(1e-1);
	});
});