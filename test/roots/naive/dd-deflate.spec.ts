import { eCompress, eToDd } from 'big-float-ts';
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, ddDeflate, toCasStr, allRoots } from '../../../src/index.js';


describe('ddDeflate', function() {
	it('should correctly deflate (in double-double precision) some polynomials', 
	function() {
		/*
		{
			const p = [[0,1], [0,-5], [0,8], [0,-4]];
			const r = 2;
			assert(eEqual(ddDeflate(p, r), [[0,1], [0,-3], [0,2]]));   
		}
		{
			const p = [[0,1], [0,-3], [0,2]];
			const r = 2;
			assert(eEqual(ddDeflate(p, r), [[0,1],[0,-1]]));
		}
		{
			const p = [[0,1], [0,-1]];
			const r = 1;
			assert(eEqual(ddDeflate(p, r), [[0,1]]));
		}
		*/
		{
			const p = [
				[289929216],
				[-1434354240],
				[2657550888],
				[-1.8862192519009113e-7, -2178410857.975074],
				[-3.2654497772455215e-8, 681767178.2820708],
				[2.953129296656698e-9, -34728237.352687724 ]
			];

			const r = 0.0625;
			
			const res = ddDeflate(p.map(c => eToDd(c)), r);
			expect(eEqual(res, [
				[0, 289929216],
				[0, -1416233664],
				[0, 2569036284],
				[4.979665391147137e-8, -2017846090.225074],
				[1.5161276678554714e-8, 555651797.6430036]
			])).to.be.true;
		}
	});
});
