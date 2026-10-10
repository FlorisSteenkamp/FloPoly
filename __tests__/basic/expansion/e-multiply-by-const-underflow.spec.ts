import { describe, expect, it } from '@jest/globals';
import { eMultiplyByConst } from '../../../src/basic/expansion/e-multiply-by-const.js';


describe('eMultiplyByConst - underflow', function() {
    it('should remove leading zeros caused by underflow', function() {
        expect(eMultiplyByConst([1e-300], [[1e-300], [1]])).toEqual([[1e-300]]);
        expect(eMultiplyByConst([1e-300], [[1e-300], [1e-300]])).toEqual([]);
        expect(eMultiplyByConst([2], [[3], [4]])).toEqual([[6], [8]]);
    });
});
