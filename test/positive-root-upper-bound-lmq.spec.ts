
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { positiveRootUpperBound_LMQ } from '../src/index';


describe('positiveRootUpperBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		let p2: number[] = [];
		let p3 = [3];
		// Wilkinson's polynomial 
		let p4 = [
			1, -231, 25025, -1689765, 79721796, -2792167686, 
			75289668850, -1599718388730, 27188611869881, 
			-373100999802531, 4154823851430525, -37600535086859740, 
			276019109275035330, -1634980697246583300, 
			7744654310169577000, -28939583397335440000, 
			83637381699544800000, -181664979520697100000, 
			284093315901811460000, -298631902863216400000, 
			186244810780170260000, -51090942171709440000
		];
		expect(positiveRootUpperBound_LMQ(p1)).to.equal(4.015534272870436);
		expect(positiveRootUpperBound_LMQ(p2)).to.equal(0);
		expect(positiveRootUpperBound_LMQ(p3)).to.equal(0);
		expect(positiveRootUpperBound_LMQ(p4)).to.equal(462);
	});
});