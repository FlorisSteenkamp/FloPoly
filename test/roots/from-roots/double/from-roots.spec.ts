
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, fromRoots } from '../../../../src/index.js';


describe('fromRoots', function() {
	it('should calculate some polynomials correctly from given roots', 
	function() {
		let p1 = [1,2,3,3];
		assert(equal(fromRoots(p1), [1, -9, 29, -39, 18]));
	});
});