import { describe, expect, it } from '@jest/globals';
import { ddRemoveLeadingZeros } from '../../../src/basic/double-double/dd-remove-leading-zeros.js';


describe('ddRemoveLeadingZeros', function() {
    it('should remove all leading coefficients with zero high part', function() {
        const p = [[0,0], [0,0], [0,3], [0,1]];
        expect(ddRemoveLeadingZeros(p)).toEqual([[0,3], [0,1]]);
    });

    it('should return empty if all coefficients are leading zeros', function() {
        expect(ddRemoveLeadingZeros([[0,0], [0,0]])).toEqual([]);
    });
});
