import { describe, expect, it } from '@jest/globals';
import { ddSubtract } from '../../../src/basic/double-double/dd-subtract.js';


describe('ddSubtract', function() {
    it('should subtract polynomials correctly', function() {
        const p1 = [[0,1], [0,2], [0,3]];
        const p2 = [[0,3], [0,4]];
        expect(ddSubtract(p1, p2)).toEqual([[0,1], [0,-1], [0,-1]]);
        expect(ddSubtract(p2, p1)).toEqual([[0,-1], [0,1], [0,1]]);
    });

    it('should remove leading zeros in result', function() {
        const p1 = [[0,1], [0,2]];
        const p2 = [[0,1], [0,1]];
        expect(ddSubtract(p1, p2)).toEqual([[0,1]]);
    });
});
