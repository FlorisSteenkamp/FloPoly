
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eProduct } from '../../../src/index.js';


describe('eProduct', function() {
	it('should correctly multiply some polynomials with Shewchuk expansion coefficients',
	function() {
		let p1 = [[2]];
		let p2: number[][] = [];
		let p3 = [[1],[2],[3]];
		let p4 = [[4],[4],[5],[6],[7]];
		assert(eEqual(eProduct([]), [[1]]));
		assert(eEqual(eProduct([p1,p3]), [[2],[4],[6]]));
		assert(eEqual(eProduct([p2,p3]), []));
		assert(eEqual(eProduct([p3,p4]), [[4], [12], [25], [28], [34], [32], [21]]));
	});
});