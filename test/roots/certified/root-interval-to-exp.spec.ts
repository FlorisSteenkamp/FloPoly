
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { rootIntervalToExp, RootInterval, RootIntervalExp } from '../../../src/index.js';


describe('rootIntervalToExp',
function() {
	it('should correctly convert a double precision root interval to a double-double precision one',
	function() {
		{
			// some root interval
			let ri: RootInterval = {
                tS: 0.9,
                tE: 0.9 + Number.EPSILON,
                multiplicity: 3
            }

            let r: RootIntervalExp = rootIntervalToExp(ri);

            expect(r).to.eql({
                tS: [0, 0.9],
                tE: [0, 0.9 + Number.EPSILON],
                multiplicity: 3
            });
		}
	});
});
