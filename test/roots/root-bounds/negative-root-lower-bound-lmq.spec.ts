
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { negativeRootLowerBound_LMQ } from '../../../src/index.js';


describe('negativeRootLowerBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		let p2: number[] = [];
		let p3 = [3];
		// real roots at about -2.397918624065303 and 2.8793785310848383
		expect(negativeRootLowerBound_LMQ(p1)).to.equal(-4.015534272870436);
		// real roots everywhere
		expect(negativeRootLowerBound_LMQ(p2)).to.equal(0);
		// real roots nowhere
		expect(negativeRootLowerBound_LMQ(p3)).to.equal(0);
	});
});