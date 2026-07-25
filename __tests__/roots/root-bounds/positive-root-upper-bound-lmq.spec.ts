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
            expect(nub_).toEqual(-1.7104422955129255);
            expect(plb_).toEqual(1.7104422955129255);
            expect(pub_).toEqual(4.068140295251116);

            expect(nlb_ < nlb);
            expect(nub_ > nub);
            expect(plb_ < plb);
            expect(pub_ > pub);
        }
        {
            // const p = [2,-3,6,5,-130];
            const T = 2;
            const p_ = [T,T,T,T,T];

            const nlb_ = negativeRootLowerBound_LMQ_WithError(p,p_);
            const nub_ = negativeRootUpperBound_LMQ_WithError(p,p_);
            const plb_ = positiveRootLowerBound_LMQ_WithError(p,p_);
            const pub_ = positiveRootUpperBound_LMQ_WithError(p,p_);

            expect(nlb_).toEqual(-8.082480041244379);
            expect(nub_).toEqual(-3.207534329995826);
            expect(plb_).toEqual(2.8722813232690143);
            expect(pub_).toEqual(Infinity);


            expect(nlb_ < nlb);
            expect(nub_ > nub);
            expect(plb_ < plb);
            expect(pub_ > pub);
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
            expect(nub_).toEqual(-0);
            expect(plb_).toEqual(0);
            expect(pub_).toEqual(Infinity);

            expect(nlb_ < nlb);
            expect(nub_ > nub);
            expect(plb_ < plb);
            expect(pub_ > pub);
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

        expect(q).toEqual([1.9, -3.2, 5.7, 4.6, -130.5, 0, 0, 0]);
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

    it('should return Infinity in strict mode when signs are too uncertain',
    function() {
        // `p[0]` can be > 0 but is not guaranteed > 0, and `p[1]` can be < 0.
        // In strict mode this means no finite guaranteed LMQ bound.
        const p = [0.1, -1];
        const p_ = [0.2, 0.1];

        expect(positiveRootUpperBound_LMQ_WithError(p, p_)).toEqual(Infinity);
    });
});