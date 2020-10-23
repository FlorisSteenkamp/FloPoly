
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { createRootExact } from '../../../src/index';


describe('createRootExact',
function() {
	it('should correctly create rational root object { tS: t, tE: t, multiplicity: 1 }',
	function() {
		{
			// some root interval
			let r = createRootExact(2);

            // this test is really just for completeness' sake
            expect(r).to.eql({
                tS: 2,
                tE: 2,
                multiplicity: 1
            });
		}
	});
});
