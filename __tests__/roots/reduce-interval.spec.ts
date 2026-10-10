import { describe, expect, it } from '@jest/globals';
import { reduceInterval } from '../../src/roots/reduce-interval.js';
import { negativeRootLowerBound_LMQ_WithError } from '../../src/roots/root-bounds/lmq/negative-root-lower-bound-lmq-with-err.js';
import { positiveRootUpperBound_LMQ_WithError } from '../../src/roots/root-bounds/lmq/positive-root-upper-bound-lmq-with-err.js';
import { γ1, γγ3 } from '../../src/error-analysis/gamma.js';
import { roots } from '../../src/roots/descartes/roots.js';

const { abs } = Math;


describe('reduceInterval', function() {
    it('should include the double-double to double round-off in the error bound', function() {
        const p = [2, -3, 6, 5, -130];  // real roots at about -2.398 and 2.879
        const pDd_ = [0.5, 0.5, 0.5, 0.5, 0.5];

        const [lb, ub] = reduceInterval(-Infinity, Infinity, p, pDd_, γγ3);

        // the bounds must be those of the family with the *combined* error
        const p_ = pDd_.map((E, i) => E*γγ3 + abs(p[i])*γ1);
        expect(lb).toEqual(negativeRootLowerBound_LMQ_WithError(p, p_));
        expect(ub).toEqual(positiveRootUpperBound_LMQ_WithError(p, p_));

        // ...and thus never tighter than those of the family without the round-off
        const pOnly_ = pDd_.map(E => E*γγ3);
        expect(lb <= negativeRootLowerBound_LMQ_WithError(p, pOnly_)).toBe(true);
        expect(ub >= positiveRootUpperBound_LMQ_WithError(p, pOnly_)).toBe(true);

        // the roots are contained
        expect(lb <= -2.397918624065303 && ub >= 2.8793785310848383).toBe(true);
    });

    it('should not widen a finite interval that is already tighter than the root bounds', function() {
        const p = [1, 0, -4];  // roots ±2 (the LMQ bounds are about ±2.83)
        const [lb, ub] = reduceInterval(-2.5, 2.5, p, [0, 0, 0], γγ3);
        expect(lb).toEqual(-2.5);
        expect(ub).toEqual(2.5);
        // ...but a looser interval is reduced to the root bounds
        const [lb2, ub2] = reduceInterval(-3, 3, p, [0, 0, 0], γγ3);
        expect(lb2 > -3 && lb2 <= -2).toBe(true);
        expect(ub2 < 3 && ub2 >= 2).toBe(true);
    });

    it('should still find all roots through `roots` with automatic interval reduction', function() {
        const p = [1, -2, -5, 6];  // roots -2, 1, 3
        const rs = roots(p.map(c => [0, c]), -Infinity, Infinity)!;
        expect(rs.map(r => r.multiplicity)).toEqual([1, 1, 1]);
        expect(rs[0].tS <= -2 && rs[0].tE >= -2).toBe(true);
        expect(rs[1].tS <= 1 && rs[1].tE >= 1).toBe(true);
        expect(rs[2].tS <= 3 && rs[2].tE >= 3).toBe(true);
    });
});
