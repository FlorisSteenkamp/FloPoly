
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { evalAdaptive } from '../../../src/roots/certified/eval-adaptive.js';
import { eMultiply, eDifferentiate, Horner } from '../../../src/index.js';
import { eToDd, eEstimate } from 'big-float-ts';
import { transposePoly } from '../../../src/roots/certified/transpose-poly.js';


describe('evalAdaptive',
function() {
	it('should correctly adaptive evaluate a polynomial (used with `allRootsCertifiec`)',
	function() {
		{
            let _p = eMultiply(
                eMultiply([[1],[-1]],[[1],[-1]]),
                eMultiply([[1],[-2]],[[1],[-2]])
            );
            // coefficients in double-double precision
            let p = _p.map(c => eToDd(c));
            // coefficient-wise error bound of double-double precision 
            // coefficients (faked)
            let pE = p.map(c => Math.abs(c[1])*Number.EPSILON);
            let getPExact = () => p;
            
            const getPolyExact = () => {
                let poly = getPExact();
                const psExact = [poly];
                while (poly.length > 1) {
                    poly = eDifferentiate(psExact[psExact.length-1]);
                    psExact.push(poly);
                }
            
                return psExact[0];
            }

            let p_ = transposePoly(p);
            const V1 = evalAdaptive(p_, pE, 1, getPolyExact);
            //const V2 = Horner(p.map(c => eEstimate(c)), 1);

            assert(V1 === 0);
		}
	});
});
