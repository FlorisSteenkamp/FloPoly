import { describe, expect, it } from '@jest/globals';
// import type { RootInterval } from '../../../src/index.js';
import { mid } from '../../../src/roots/certified/root-interval.js';


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
            expect(r).toEqual(1.5);
		}
	});
});
