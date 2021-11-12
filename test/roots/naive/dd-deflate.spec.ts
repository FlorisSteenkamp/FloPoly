
import { assert } from 'chai';
import { describe } from 'mocha';
import { eEqual, ddDeflate } from '../../../src/index.js';


describe('ddDeflate', function() {
	it('should correctly deflate (in double-double precision) some polynomials', 
	function() {
		let p1 = [[0,1], [0,-5], [0,8], [0,-4]];
		let r1 = 2;
		let p2 = [[0,1], [0,-3], [0,2]];
		let r2 = 2;
		let p3 = [[0,1], [0,-1]];
		let r3 = 1;
		assert(eEqual(ddDeflate(p1, r1), [[0,1], [0,-3], [0,2]]));   
		assert(eEqual(ddDeflate(p2, r2), [[0,1],[0,-1]]));
		assert(eEqual(ddDeflate(p3, r3), [[0,1]]));
	});
});
