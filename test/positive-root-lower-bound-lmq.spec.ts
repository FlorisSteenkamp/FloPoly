
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { positiveRootLowerBound_LMQ } from '../src/index';


describe('positiveRootLowerBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		let p2: number[] = [];
		let p3 = [3];
		expect(positiveRootLowerBound_LMQ(p1)).to.equal(1.6883241876925903);
		expect(positiveRootLowerBound_LMQ(p2)).to.equal(0);
		expect(positiveRootLowerBound_LMQ(p3)).to.equal(0);
	});
});