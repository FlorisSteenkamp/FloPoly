
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { mid, RootInterval } from '../../../src/index';


describe('mid',
function() {
	it('should correctly return the middle of the root interval',
	function() {
		{
            // some root interval
            let ri: RootInterval = { tS: 1, tE: 2, multiplicity: 3 };
			let r = mid(ri);

            // this test is really just for completeness' sake
            expect(r).to.eql(1.5);
		}
	});
});
