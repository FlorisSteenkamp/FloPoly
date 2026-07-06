import { squares } from 'squares-rng';
import { describe, expect, it } from '@jest/globals';
import { equal } from '../../../src/basic/double/equal.js';
import { changeVariablesLinear } from '../../../src/change-variables/double/change-variables-linear.js';
import { taylorShift } from '../../../src/change-variables/double/taylor-shift.js';
import { randomIntInRange } from '../../../src/error-analysis/random-int-in-range.js';



describe('changeVariablesLinear', function() {
    it('should correctly perform the change of variables p(x) <- p(ax + b) for some polynomials with double precision coefficients', 
    function() {
        {
        let p1: number[] = [];
        const r = changeVariablesLinear(p1, 3, 4);
        expect(equal(r, [])).toEqual(true);
        
        }
        {
            let p = [1,2,7];
            const r = changeVariablesLinear(p, 3, 4);
            expect(equal(r, [9,30,31])).toEqual(true);
        }
        {
            let p = [1,2,7];
            const r = changeVariablesLinear(p, 1, 4);
            const r_ = taylorShift(p, 4);//?
            expect(equal(r, [1,10,31])).toEqual(true);
        }
        {
            // Benchmark test
            const N = 10_000;
            const polys: number[][] = [];
            const ats: number[] = [];
            for (let i=0; i<N; i++) {
                const p = new Array(10).fill(0).map((_,idx) => squares(20*i + idx));
                polys.push(p);
                ats.push(randomIntInRange(-10,10,10*i + 15));
            }
            const timeStart = performance.now();
            for (let i=0; i<N; i++) {
                const p = polys[i];
                const at = ats[i];
                const r = changeVariablesLinear(p, at, 5);
            }
            let timing = performance.now() - timeStart;
            console.log(`changeVariablesLinear: ${timing} ms for ${N} polynomials of degree 9`);
        }
    });
});