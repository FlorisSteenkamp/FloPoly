import { describe, expect, it } from '@jest/globals';
// import { RootInterval, RootIntervalExp } from '../../../src/index.js';
import { rootIntervalToExp } from '../../../src/roots/certified/root-interval-to-exp.js';


describe('rootIntervalToExp',
function() {
	it('should correctly convert a double precision root interval to a double-double precision one',
	function() {
		{
			// some root interval
			// let ri: RootInterval = {
            let ri: any = {
                tS: 0.9,
                tE: 0.9 + Number.EPSILON,
                multiplicity: 3
            }

            // let r: RootIntervalExp = rootIntervalToExp(ri);
            let r: any = rootIntervalToExp(ri);

            expect(r).toEqual({
                tS: [0, 0.9],
                tE: [0, 0.9 + Number.EPSILON],
                multiplicity: 3
            });
		}
	});
});
