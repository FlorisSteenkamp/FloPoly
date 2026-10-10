import { describe, expect, it } from '@jest/globals';
import { ddDivideByConst } from '../../../src/basic/double-double/dd-divide-by-const.js';


describe('ddDivideByConst', function() {
    it('should divide each coefficient by the constant', function() {
        const p = [[0,6], [0,4], [0,2]];
        const c = [0,2];
        expect(ddDivideByConst(p, c)).toEqual([[0,3], [0,2], [0,1]]);
    });

    it('should return empty polynomial when input is empty', function() {
        expect(ddDivideByConst([], [0,2])).toEqual([]);
    });
});


describe('ddDivideByConst - leading zeros', function() {
    it('should remove leading zeros caused by underflow', function() {
        // the leading coefficient (1e-600) underflows to zero and is removed
        const r = ddDivideByConst([[0,1e-300], [0,1]], [0,1e300]);
        expect(r.length).toEqual(1);
        expect(r[0][1]).toEqual(1e-300);
    });
});
