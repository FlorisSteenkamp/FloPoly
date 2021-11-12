
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual, bFromRoots } from '../../../../src/index.js';


describe('bFromRoots', function() {
	it('should calculate some polynomials correctly from given roots', 
	function() {
		let p1 = [1n,2n,3n,3n];
		assert(bEqual(bFromRoots(p1), [1n, -9n, 29n, -39n, 18n]));
	});
});