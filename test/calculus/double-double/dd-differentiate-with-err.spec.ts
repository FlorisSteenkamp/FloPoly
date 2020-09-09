
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, ddDifferentiateWithError } from '../../../src/index';


describe('ddDifferentiateWithError', function() {
	it('should differentiate (including error bound) of some polynomials with double-double precision coefficients correctly', 
	function() {
		let p1: number[][] = [];
		let p2 = [[0,1]];
		let p3 = [[0,5], [0,4], [0,3], [0,2], [0,1]];
		let p1E: number[] = [];
		let p2E = p2.map(c => c[1]*Number.EPSILON*2**10);
		let p3E = p3.map(c => c[1]*Number.EPSILON*2**10);

		expect(ddDifferentiateWithError({ p: p1, pE: p1E })).to.eql(
			{ p: [], pE: [] }
		);

		expect(ddDifferentiateWithError({ p: p2, pE: p2E })).to.eql(
			{ p: [], pE: [] }
		);
		
		let r = ddDifferentiateWithError({ p: p3, pE: p3E }); 
		expect(r).to.eql(
			{
				p: [ [ 0,20 ], [ 0,12 ], [ 0,6 ], [ 0,2 ] ],
				pE: [ 
					4.547473508864641e-12, 
					2.7284841053187847e-12, 
					1.3642420526593924e-12, 
					4.547473508864641e-13 
				]
			}
		);
	});
});