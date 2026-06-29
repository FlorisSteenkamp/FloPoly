import { describe, expect, it } from '@jest/globals';
import { ddMultiplyByConst } from '../../../src/basic/double-double/dd-multiply-by-const.js';


describe('ddMultiplyByConst', function() {
    it('should multiply each coefficient by the constant', function() {
        const c = [0,2];
        const p = [[0,3], [0,-1], [0,4]];
        expect(ddMultiplyByConst(c, p)).toEqual([[0,6], [0,-2], [0,8]]);
    });

    it('should return zero polynomial when multiplied by zero', function() {
        expect(ddMultiplyByConst([0,0], [[0,3], [0,2]])).toEqual([[0,0]]);
    });
});
