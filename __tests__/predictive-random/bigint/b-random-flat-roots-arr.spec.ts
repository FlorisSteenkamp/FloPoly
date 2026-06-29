import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatRootsArr } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatRootsArr', function() {
    it('should predictably generate an array of polynomials with roots in a flat random distribution', 
    function() {
        let res: bigint[][];
        let expected1 = [
            35184372088832n,
            -607721334374400n,
            3424666384336699n,
            -6309998537583521n
        ];
        let expected2 = [
            281474976710656n,
            -4203819533598720n,
            16219858872809900n,
            -4085309037762801n
        ];

        res = bFlatRootsArr(2,3,0,10);
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);
        
        res = bFlatRootsArr(2,3,0,10);
        expect(bEqual(res[0], expected1)).toEqual(true);
        expect(bEqual(res[1], expected2)).toEqual(true);
        
        res = bFlatRootsArr(2,3,0,10,undefined,0.5);
        expect(bEqual(res[0], [
            70368744177664n,
            -1147846125158400n,
            6241173987296867n,
            -11311694104276030n
        ])).toEqual(true);
        expect(bEqual(res[1], [
            17592186044416n,
            -438096279633920n,
            3614633864148519n,
            -9870509246382590n
        ])).toEqual(true);

        res = bFlatRootsArr(2,3);expect(bEqual(res[0], [
            18014398509481984n,
            -31115332319969280n,
            17534291887803900n,
            -3230719251242763n
        ])).toEqual(true);
        expect(bEqual(res[1], [
            72057594037927936n,
            -107617780060127232n,
            41522838714393344n,
            -1045839113667277n
        ])).toEqual(true);
    });
});