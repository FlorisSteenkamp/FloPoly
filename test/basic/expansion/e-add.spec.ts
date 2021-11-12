
import { expect } from 'chai';
import { describe } from 'mocha';
import { eAdd } from '../../../src/index.js';


describe('eAdd', function() {
	it('should add some polynomials with Shewchuk expansion coefficients correctly', 
	function() {
		let p1 = [[3],[4]];
		let p2 = [[1],[2],[3]];
		let p3 = [[3],[2],[1]];
		expect(eAdd(p1,p2)).to.eql([[1],[5],[7]]);
		expect(eAdd(p2,p1)).to.eql([[1],[5],[7]]);
		expect(eAdd(p3,p2)).to.eql([[4],[4],[4]]);
	});
});