import { test, describe, expect, it } from '@jest/globals';
import { toCasStr } from '../../../src/basic/to-cas-str';
import { eFromRoots } from '../../../src/roots/from-roots/expansion/e-from-roots';
import { roots } from '../../../src/lab/roots';


test('find all roots for some special cases using Descartes` method', 
function() {
    // {
    //     // const _rs = [[0.5]];
    //     const _rs = [[0.49999999999999994]];
    //     const { pDd, pE, getPExact } = eFromRoots(_rs);
    //     pDd;//?
    //     console.log(toCasStr(getPExact()));
    //     // => x - 0.5
    //     const rs = roots(pDd, 0, 1, pE, getPExact);
    //     console.log(rs);
    // }

    // {
    //     const _rs = [[1]];
    //     const { pDd, pE, getPExact } = eFromRoots(_rs);
    //     pDd;//?
    //     console.log(toCasStr(getPExact()));
    //     // => x - 0.5
    //     const rs = roots(pDd, 0, 1, pE, getPExact);
    //     console.log(rs);
    // }

    {
        const _rs = [[0.7], [0.8]];
        const { pDd, pE, getPExact } = eFromRoots(_rs);
        pDd;//?
        console.log(toCasStr(getPExact()));
        // => x - 0.5
        const rs = roots(pDd, 0, 1, pE, getPExact);
        console.log(rs);
    }

    // {
    //     const _rs = [[0.5],[0.75]];
    //     const { pDd, pE, getPExact } = eFromRoots(_rs);
    //     pDd;//?
    //     console.log(toCasStr(getPExact()));
    //     // => x - 0.5
    //     const rs = roots(pDd, 0, 1, pE, getPExact);
    //     console.log(rs);
    // }
});
