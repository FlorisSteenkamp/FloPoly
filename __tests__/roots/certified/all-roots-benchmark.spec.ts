import { describe, expect, it } from '@jest/globals';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { getPolies } from '../../get-poly.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';


describe('allRootsCertified - find all roots benchmark', 
function() {
    it('should find roots correctly, and fast',
    function() {
        test(true);  // log results
        //test(false);   // don't log results
    });
});


function test(log: boolean) {
    // find roots within a huge range
    //const lb = -(10**10);
    //const ub = +(10**10);

    // find roots within a typical range
    //const lb = 0;
    //const ub = 1;

    // find roots on the entire number line
    const lb = -Infinity;
    const ub = Infinity;

    // number of polynomials to find roots of
    const N = 1;
    const shift = 0;

    const timeStartA = performance.now();

    // Get `N` realistic polynomials (the intersection polynomials of beziers)
    const polys = getPolies(N, shift);

    const timingA = performance.now() - timeStartA;
    if (log) { console.log('milli-seconds (get coeffs): ' + timingA.toFixed(3)); }


    // find all roots of all generated polynomials using allRoots
    let total2 = 0;
    const timeStartB = performance.now();
    {
        for (let i=0; i<N; i++) {
            const { p } = polys[i];
            const ts = allRoots(p, lb, ub);
            total2 += ts.length;
        }
    }
    const timingB = performance.now() - timeStartB;


    // find all roots of all generated polynomials using allRootsCertified
    let total1 = 0;
    const timeStartC = performance.now();
    {
        
        for (let i=0; i<N; i++) {
            const { pDd, pDd_, getPExact } = polys[i];
            const errBound = pDd_.map((e, idx) => e*γγ3);
            const ts = allRootsCertified(pDd, lb, ub, errBound, getPExact);
            if (ts) { total1 += ts.length; }
        }
    }
    const timingC = performance.now() - timeStartC;


    if (log) { console.log('milli-seconds (naive prec): ' + timingB.toFixed(3)); }
    if (log) { console.log('milli-seconds (multi prec): ' + timingC.toFixed(3)); }
    
    if (log) { console.log('cert/fast', (timingC/timingB).toFixed(3)); }
    if (log) { console.log('total roots (cert)', total1); }
    if (log) { console.log('total roots (naiv)', total2); }
}
