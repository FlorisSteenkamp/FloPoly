
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, flatRootsArr } from '../../../src/index.js';


describe('random.flatRootsArr', function() {
	it('should predictably generate an array of polynomials with roots in a flat random distribution', 
	function() {
		let res: number[][];
		
		res = flatRootsArr(2,3,0,10);
		assert(equal(res[0], [1, -17.27247918024659, 97.33487287168995, -179.34094494147305]));
		assert(equal(res[1], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]));
		
		res = flatRootsArr(2,3,0,10);
		assert(equal(res[0], [1, -17.27247918024659, 97.33487287168995, -179.34094494147305]));
		assert(equal(res[1], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]));
		
		res = flatRootsArr(2,3,0,10,undefined,0.5);
		assert(equal(res[0], [1, -16.311874520033598, 88.69241678577377, -160.74884149867373]));
		assert(equal(res[1], [1, -24.90289032459259, 205.46814676825528, -561.073491461604]));
	});
});