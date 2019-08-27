
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { negativeRootLowerBound_LMQ } from '../src/index';


describe('negativeRootLowerBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		expect(negativeRootLowerBound_LMQ(p1)).to.equal(-4.015534272870436);
	});
});