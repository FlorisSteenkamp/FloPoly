import { describe, expect, it } from '@jest/globals';
import { ddDiffDd } from "double-double";
import { perturb } from '../../src/error-analysis/perturb.js';
import { γ1 } from '../../src/error-analysis/gamma.js';
import { random } from '../../src/error-analysis/random.js';
import { randomIntInRange } from '../../src/error-analysis/random-int-in-range.js';


describe('perturb', function() {
    it('should return a value within the expected error bound', function() {
        {
            const N = 100;
            const shift = 0;
            const MIN_E = 1;
            const MAX_E = 20;
            for (let i=0; i<N; i++) {
                const v = random(10*(i + shift) + 0); 
                const E = randomIntInRange(MIN_E, MAX_E, 10*(i + shift) + 1);

                const rRngIdx = 10*(i + shift) + 2;
                const r = perturb(v, E, rRngIdx);

                const errMax = v*E*γ1;
                const err = ddDiffDd([0,v], [0,r])[1];

                const errRel = Math.abs(err)/errMax;

                expect(errRel <= 1).toBe(true);
            }
        }
    });
});
