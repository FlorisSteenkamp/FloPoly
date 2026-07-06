import { describe, expect, it } from '@jest/globals';
import { createRootExact } from '../../../src/roots/root-interval.js';


describe('createRootExact',
function() {
    it('should correctly create rational root object { tS: t, tE: t, multiplicity: 1 }',
    function() {
        {
            // some root interval
            let r = createRootExact(2);

            // this test is really just for completeness' sake
            expect(r).toEqual({
                t: 2,
                tS: 2,
                tE: 2,
                multiplicity: 1
            });
        }
    });
});
