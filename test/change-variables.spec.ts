
import { assert } from 'chai';
import { describe } from 'mocha';
import { changeVariables } from '../src/index';


describe('changeVariables', function() {
	it('should return the correct results for some input parameters', 
	function() {
		let res = changeVariables([1,2,7], 3, 4); //=> [9, 30, 31]
		assert.equal(res[0], 9);
		assert.equal(res[1], 30);
		assert.equal(res[2], 31);
	});
});