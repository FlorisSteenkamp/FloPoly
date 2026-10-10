import { describe, expect, it } from '@jest/globals';

import { bEqual } from '../../../src/basic/bigint/b-equal.js';
import { bFlatRootsArr } from '../../../src/predictive-random/bigint/b-random.js';


describe('random.bFlatRootsArr', function() {
    it('should predictably generate an array of polynomials with roots in a flat random distribution', 
    function() {
        let res: bigint[][];
        let expected1 = [
            70368744177664n,
            -1227601024122880n,
            6822178387552453n,
            -12112899480573378n
        ];
        let expected2 = [
            17592186044416n,
            -376901798051840n,
            2519738566387633n,
            -4979998444225504n
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
            -1147846126141440n,
            6241173997987017n,
            -11311694133338760n
        ])).toEqual(true);
        expect(bEqual(res[1], [
            2251799813685248n,
            -21603650397798400n,
            21274101714897768n,
            -5543075580824377n
        ])).toEqual(true);

        res = bFlatRootsArr(2,3);expect(bEqual(res[0], [
            18014398509481984n,
            -31426586217545728n,
            17464776672134282n,
            -3100902267026785n
        ])).toEqual(true);
        expect(bEqual(res[1], [
            4503599627370496n,
            -9648686030127104n,
            6450530729952340n,
            -1274879601721729n
        ])).toEqual(true);
    });
});