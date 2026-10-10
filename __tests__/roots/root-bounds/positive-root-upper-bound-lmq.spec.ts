import { describe, expect, it } from '@jest/globals';
import { positiveRootUpperBound_LMQ } from '../../../src/roots/root-bounds/lmq/positive-root-upper-bound-lmq.js';
import { positiveRootUpperBound_LMQ_WithError } from '../../../src/roots/root-bounds/lmq/positive-root-upper-bound-lmq-with-err.js';
import { toPolyForPositiveRootUpperBound_LMQ } from '../../../src/roots/root-bounds/lmq/to-poly-for-positive-root-upper-bound-lmq.js';
import { roots as getRoots } from '../../../src/roots/descartes/roots.js';
import { positiveRootLowerBound_LMQ_WithError } from '../../../src/roots/root-bounds/lmq/positive-root-lower-bound-lmq-with-err.js';
import { positiveRootLowerBound_LMQ } from '../../../src/roots/root-bounds/lmq/positive-root-lower-bound-lmq.js';
import { negativeRootLowerBound_LMQ } from '../../../src/roots/root-bounds/lmq/negative-root-lower-bound-lmq.js';
import { negativeRootUpperBound_LMQ } from '../../../src/roots/root-bounds/lmq/negative-root-upper-bound-lmq.js';
import { negativeRootLowerBound_LMQ_WithError } from '../../../src/roots/root-bounds/lmq/negative-root-lower-bound-lmq-with-err.js';
import { negativeRootUpperBound_LMQ_WithError } from '../../../src/roots/root-bounds/lmq/negative-root-upper-bound-lmq-with-err.js';


describe('positiveRootUpperBound_LMQ', function() {
    {
        const p = [2,-3,6,5,-130];
        // const roots = [-2.397918624065303, 2.8793785310848383];

        const rs = getRoots(p)!;
        const roots = rs.map(r => r.t);
        expect(roots).toEqual([-2.3979186240653028, 2.8793785310848388]);

        const nlb = negativeRootLowerBound_LMQ(p);
        const nub = negativeRootUpperBound_LMQ(p);
        const plb = positiveRootLowerBound_LMQ(p);
        const pub = positiveRootUpperBound_LMQ(p);

        expect(nlb).toEqual(-4.015534272870436);
        expect(nub).toEqual(-1.6883241876925903);
        expect(plb).toEqual(1.6883241876925903);
        expect(pub).toEqual(4.015534272870436);

        expect(roots[0] >= nlb && roots[0] <= nub).toEqual(true);
        expect(roots[1] >= plb && roots[1] <= pub).toEqual(true);

        {
            const T = 0.0;  // No error
            const p_ = [T,T,T,T,T];

            const nlb_ = negativeRootLowerBound_LMQ_WithError(p,p_);//?
            const nub_ = negativeRootUpperBound_LMQ_WithError(p,p_);//?
            const plb_ = positiveRootLowerBound_LMQ_WithError(p,p_);//?
            const pub_ = positiveRootUpperBound_LMQ_WithError(p,p_);//?

            expect(nlb_).toEqual(nlb);
            expect(nub_).toEqual(nub);
            expect(plb_).toEqual(plb);
            expect(pub_).toEqual(pub);

            expect(nlb_).toEqual(-4.015534272870436);
            expect(nub_).toEqual(-1.6883241876925903);
            expect(plb_).toEqual(1.6883241876925903);
            expect(pub_).toEqual(4.015534272870436);

            expect(nlb_ < nlb);
            expect(nub_ > nub);
            expect(plb_ < plb);
            expect(pub_ > pub);
        }

        {
            const T = 0.1;
            const p_ = [T,T,T,T,T];

            const nlb_ = negativeRootLowerBound_LMQ_WithError(p,p_);
            const nub_ = negativeRootUpperBound_LMQ_WithError(p,p_);
            const plb_ = positiveRootLowerBound_LMQ_WithError(p,p_);
            const pub_ = positiveRootUpperBound_LMQ_WithError(p,p_);

            expect(nlb_).toEqual(-4.068140295251116);
            expect(nub_).toEqual(-1.6675350353921343);
            expect(plb_).toEqual(1.6675350353921343);
            expect(pub_).toEqual(4.068140295251116);

            // the bounds with error must be looser
            expect(nlb_ < nlb).toBe(true);
            expect(nub_ > nub).toBe(true);
            expect(plb_ < plb).toBe(true);
            expect(pub_ > pub).toBe(true);
        }
        {
            // const p = [2,-3,6,5,-130];
            const T = 2;
            const p_ = [T,T,T,T,T];

            const nlb_ = negativeRootLowerBound_LMQ_WithError(p,p_);
            const nub_ = negativeRootUpperBound_LMQ_WithError(p,p_);
            const plb_ = positiveRootLowerBound_LMQ_WithError(p,p_);
            const pub_ = positiveRootUpperBound_LMQ_WithError(p,p_);

            // the leading coefficient's sign is uncertain (2 ± 2) so the
            // polynomial could be of lower degree with arbitrarily large roots
            expect(nlb_).toEqual(-Infinity);
            expect(nub_).toEqual(-1.414213562373095);
            expect(plb_).toEqual(1.414213562373095);
            expect(pub_).toEqual(Infinity);

            // the bounds with error must be looser
            expect(nlb_ < nlb).toBe(true);
            expect(nub_ > nub).toBe(true);
            expect(plb_ < plb).toBe(true);
            expect(pub_ > pub).toBe(true);
        }
        {
            // const p = [2,-3,6,5,-130];
            const T = 10;
            const p_ = [T,T,T,T,T];

            const nlb_ = negativeRootLowerBound_LMQ_WithError(p,p_);
            const nub_ = negativeRootUpperBound_LMQ_WithError(p,p_);
            const plb_ = positiveRootLowerBound_LMQ_WithError(p,p_);
            const pub_ = positiveRootUpperBound_LMQ_WithError(p,p_);

            expect(nlb_).toEqual(-Infinity);
            expect(nub_).toEqual(-0.8891397050194614);
            expect(plb_).toEqual(0.8891397050194614);
            expect(pub_).toEqual(Infinity);

            // the bounds with error must be looser
            expect(nlb_ < nlb).toBe(true);
            expect(nub_ > nub).toBe(true);
            expect(plb_ < plb).toBe(true);
            expect(pub_ > pub).toBe(true);
        }
    }
    it('should correctly find bounds of some polynomial roots', 
    function() {
        const p1 = [2,-3,6,5,-130];
        const p2: number[] = [];
        const p3 = [3];
        // Wilkinson's polynomial of degree 21 - roots at 1,2,...,21
        const p4 = [
            1, -231, 25025, -1689765, 79721796, -2792167686, 
            75289668850, -1599718388730, 27188611869881, 
            -373100999802531, 4154823851430525, -37600535086859740, 
            276019109275035330, -1634980697246583300, 
            7744654310169577000, -28939583397335440000, 
            83637381699544800000, -181664979520697100000, 
            284093315901811460000, -298631902863216400000, 
            186244810780170260000, -51090942171709440000
        ];
        // real roots at about -2.397918624065303 and 2.8793785310848383
        expect(positiveRootUpperBound_LMQ(p1)).toEqual(4.015534272870436);
        // real roots everywhere
        expect(positiveRootUpperBound_LMQ(p2)).toEqual(0);
        // real roots nowhere
        expect(positiveRootUpperBound_LMQ(p3)).toEqual(0);
        // real roots at 1,2,...,21
        expect(positiveRootUpperBound_LMQ(p4)).toEqual(462);
    });

    it('should create a conservative polynomial from coefficient-wise absolute errors',
    function() {
        const p = [2, -3, 6, 5, -130, 0.2, -0.2, 0];
        const p_ = [0.1, 0.2, 0.3, 0.4, 0.5, 0.3, 0.3, 0.1];

        const q = toPolyForPositiveRootUpperBound_LMQ(p, p_);

        // every coefficient is reduced by its error bound (the smallest
        // possible value) - uncertain-sign coefficients included
        expect(q).toEqual([2-0.1, -3-0.2, 6-0.3, 5-0.4, -130-0.5, 0.2-0.3, -0.2-0.3, 0-0.1]);
        expect(p).toEqual([2, -3, 6, 5, -130, 0.2, -0.2, 0]);
        expect(p_).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.3, 0.3, 0.1]);
    });

    it('should throw if p and p_ lengths differ',
    function() {
        expect(() => toPolyForPositiveRootUpperBound_LMQ([1, 2], [0.1]))
            .toThrow('`p` and `p_` must be of equal length.');
    });

    it('should match direct LMQ bound of the conservative polynomial',
    function() {
        const p = [2, -3, 6, 5, -130];
        const p_ = [0.1, 0.2, 0.3, 0.4, 0.5];
        const q = toPolyForPositiveRootUpperBound_LMQ(p, p_);

        expect(positiveRootUpperBound_LMQ_WithError(p, p_))
            .toEqual(positiveRootUpperBound_LMQ(q));
    });

    it('should return Infinity when the sign of the leading coefficient is uncertain',
    function() {
        // `p[0]` can be > 0 but is not guaranteed > 0 - no finite bound exists
        expect(positiveRootUpperBound_LMQ_WithError([0.1, -1], [0.2, 0.1])).toEqual(Infinity);
        // Regression: -x^2 + 5x - 3 (within error) has a root at 4.30... but
        // 1.2 was previously returned
        expect(positiveRootUpperBound_LMQ_WithError([1, 5, -3], [2, 0, 0])).toEqual(Infinity);
    });

    it('should be conservative for sign-uncertain and negative coefficients',
    function() {
        // Regression: x^2 - 3 (within error) has a root at 1.732... but 0 was
        // previously returned (the uncertain constant term was replaced by 0)
        const ub1 = positiveRootUpperBound_LMQ_WithError([1, 0, -1], [0, 0, 2]);
        expect(ub1).toEqual(2.449489742783178);
        expect(ub1 >= Math.sqrt(3)).toBe(true);
        // the same for the negative lower bound
        const lb1 = negativeRootLowerBound_LMQ_WithError([1, 0, -1], [0, 0, 2]);
        expect(lb1).toEqual(-2.449489742783178);
        expect(lb1 <= -Math.sqrt(3)).toBe(true);

        // Regression: -0.5x^2 + 4 (within error) has a root at 2.83... but
        // 2.31 was previously returned (a certainly negative leading
        // coefficient was handled incorrectly)
        const ub2 = positiveRootUpperBound_LMQ_WithError([-1, 0, 4], [0.5, 0, 0]);
        expect(ub2).toEqual(4);
        expect(ub2 >= Math.sqrt(8)).toBe(true);
        // ...and without error the negative leading coefficient still works
        expect(positiveRootUpperBound_LMQ_WithError([-1, 0, 4], [0, 0, 0]))
            .toEqual(positiveRootUpperBound_LMQ([-1, 0, 4]));
    });

    it('should pair the reversed error bounds with the reversed coefficients for lower bounds',
    function() {
        // Regression: `upperToLowerBound_WithError` reversed `p` but not `p_`.
        // x - 3 ± 2 has its root in [1,5] so the lower bound must be <= 1
        // (2.5 was previously returned)
        const lb = positiveRootLowerBound_LMQ_WithError([1, -3], [2, 0]);
        expect(lb).toEqual(0.5);
        expect(lb <= 1).toBe(true);
        // an uncertain constant term means a root could be arbitrarily close to 0
        expect(positiveRootLowerBound_LMQ_WithError([1, -3, 0], [0, 0, 1])).toEqual(0);
    });

    it('should handle leading zero coefficients',
    function() {
        // Regression: the sign test looked at the leading zero
        expect(positiveRootUpperBound_LMQ([0, -3, 5, -1])).toEqual(positiveRootUpperBound_LMQ([-3, 5, -1]));
        expect(positiveRootUpperBound_LMQ([0, 0, -3, 5, -1])).toEqual(3.3333333333333335);
        expect(positiveRootUpperBound_LMQ([0, 0])).toEqual(0);
        // exact leading zeros (with zero error) are ignored in the error variant...
        expect(positiveRootUpperBound_LMQ_WithError([0, -3, 5, -1], [0, 0, 0, 0]))
            .toEqual(positiveRootUpperBound_LMQ([-3, 5, -1]));
        // ...but a leading zero with non-zero error has an uncertain sign
        expect(positiveRootUpperBound_LMQ_WithError([0, -3, 5, -1], [1, 0, 0, 0])).toEqual(Infinity);
    });
});