import { describe, expect, it } from '@jest/globals';
import { ddDiffDd, ddMultDouble1 as ddMultD, twoSum } from "double-double";
import { ddPerturb } from '../../src/error-analysis/dd-perturb.js';
import { γ1, γγ } from '../../src/error-analysis/gamma.js';
import { random } from '../../src/error-analysis/random.js';
import { randomIntInRange } from '../../src/error-analysis/random-int-in-range.js';


describe('`ddPerturb`', function() {
    it('should return a value within the expected error bound', function() {
        {
            const N = 100;
            const shift = 1;
            const MIN_E = 1;
            const maxEs = [20, 2**53, 2**60, 2**500];
            for (let j=0; j<maxEs.length; j++) {
                const MAX_E = maxEs[j];
                let relMax = 0;
                for (let i=0; i<N; i++) {
                    const v1 = random((j*100_000) + 10*(i + shift) + 0) * 2**26;
                    const v2 = random((j*100_000) + 10*(i + shift) + 1) * 2**-26;
                    const v = twoSum(v1, v2);
                    const E = randomIntInRange(MIN_E, MAX_E, (j*100_000) + 10*(i + shift) + 2);

                    const rRngIdx = (j*100_000) + 10*(i + shift) + 3;
                    const r = ddPerturb(v, E, rRngIdx);

                    const errMax = ddMultD(E*γγ(1), v)[1];
                    const err = ddDiffDd(v, r)[1];

                    const errRel = Math.abs(err)/errMax;
                    relMax = Math.max(relMax, errRel);

                    expect(errRel <= 1).toBe(true);
                }

                // relMax;//?
            }
        }
    });
});
