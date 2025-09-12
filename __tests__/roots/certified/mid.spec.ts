// import type { RootInterval } from '../../../src/index.js';
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { mid } from '../../../src/index.js';


describe('mid',
function() {
	it('should correctly return the middle of the root interval',
	function() {
		{
            // some root interval
            // let ri: RootInterval = { tS: 1, tE: 2, multiplicity: 3 };
			let ri: any = { tS: 1, tE: 2, multiplicity: 3 };
			let r = mid(ri);

            // this test is really just for completeness' sake
            expect(r).to.eql(1.5);
		}
	});
});
