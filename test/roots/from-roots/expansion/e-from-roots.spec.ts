
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eFromRoots } from '../../../../src/index';


describe('eFromRoots', function() {
	it('should calculate some polynomials correctly from given roots', 
	function() {
		let p1 = [[1],[2],[3],[3]];
		expect(eEqual(
			eFromRoots(p1).pDd, [[0,1], [0,-9], [0,29], [0,-39], [0,18]]
		));
	});
});