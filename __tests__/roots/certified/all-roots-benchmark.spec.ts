import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { allRootsCertified, allRoots, toCasStr } from '../../../src/index.js';
import { reduceSignificand } from 'big-float-ts';
import { getCoeffs } from './getpoly/get-coeffs.js';
import { getCoeffsExact } from './getpoly/get-coeffs-exact.js';
import { performance } from 'perf_hooks';


describe('allRootsCertified - find all roots benchmark', 
function() {
	it('should find roots correctly, and fast',
	function() {
        //test(true);  // log results
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
    const lb = Number.NEGATIVE_INFINITY;
    const ub = Number.POSITIVE_INFINITY;

    const r = randOnGrid_;

    // number of polynomials to find roots of
    const n = 20_000;

    // find random cubic beziers (used later to generate realistic polynomials)
    let pss: number[][][] = [];
    for (let i=0; i<n+1; i++) {
        const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]];
        pss.push(ps);
    }

    // create intersection polynomials from the generated cubic beziers
    const polys: { coeffs: number[][]; coeffsD: number[]; errBound: number[]; getPExact: () => number[][]; }[] = [];
    const timeStartA = performance.now();
    {
        for (let i=0; i<n; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const { coeffs, coeffsD, errBound, getPExact } = getPoly(ps1, ps2);
            polys.push({ coeffs, coeffsD, errBound, getPExact });
        }
    }
    let timingA = performance.now() - timeStartA;
    if (log) { console.log('milli-seconds (get coeffs): ' + timingA.toFixed(3)); }        


    // find all roots of all generated polynomials using allRoots
    let total2 = 0;
    const timeStartB = performance.now();
    {
        for (let i=0; i<n; i++) {
            const { coeffs, coeffsD, errBound, getPExact } = polys[i];
            const ts = allRoots(coeffsD, lb, ub);
            total2 += ts.length;
        }
    }
    let timingB = performance.now() - timeStartB;
    if (log) { console.log('milli-seconds (naive prec): ' + timingB.toFixed(3)); }


    // find all roots of all generated polynomials using allRootsCertified
    let total1 = 0;
    const timeStartC = performance.now();
    {
        
        for (let i=0; i<n; i++) {
            const { coeffs, coeffsD, errBound, getPExact } = polys[i];
            const ts = allRootsCertified(coeffs, lb, ub, errBound, getPExact);
            if (ts) { total1 += ts.length; }
        }
    }
    let timingC = performance.now() - timeStartC;
    if (log) { console.log('milli-seconds (multi prec): ' + timingC.toFixed(3)); }    


    // runs an empty loop for better comparison
    const timeStartD = performance.now();
    {
        for (let i=0; i<n; i++) {
            const { coeffs, coeffsD, errBound, getPExact } = polys[i];
            const ts = [];
            total1 += ts.length;
        }
    }
    let timingD = performance.now() - timeStartD;
    if (log) { console.log('milli-seconds (empty loop): ' + timingD.toFixed(3)); }    


    if (log) { console.log('cert/fast', (timingC/timingB).toFixed(3)); }
    if (log) { console.log('total roots (cert)', total1); }
    if (log) { console.log('total roots (naiv)', total2); }
}


// Get a realistic polynomial (the intersection polynomial of the given beziers)
function getPoly(ps1: number[][], ps2: number[][]) {
    let { coeffs, errBound  } = getCoeffs(ps1, ps2);
    const coeffsD = coeffs.map(c => c[1]);

    let getPExact = () => getCoeffsExact(ps1, ps2);

    return { coeffs, coeffsD, errBound, getPExact };
}


// the maximum bitlength of the input bezier points
const maxBitLength = 45;

// the maximum coordinate of the input bezier curves - can really be almost anything
const maxCoordinate = 128;

// the maximum power of 2 exponent of the maximum coordinate
const expMax = Math.ceil(Math.log2(maxCoordinate));

// a function to generate a raondom point on a grid with given max coordinate
// and max bitlength - expMax is really superfluous / redundant
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

// random function to shift range so it is centered at zero
function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}

// a curried function to generate a raondom point on a grid with given max coordinate
// and max bitlength - expMax is really superfluous / redundant
function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}

// a function to send a given number to a fixed grid
function toGrid(
        a: number, 
        expMax: number,
        significantFigures: number): number {

    let expA = Math.floor(Math.log2(Math.abs(a)));
    let expDif = expMax - expA;
    let newSig = significantFigures - expDif + 1;

    if (newSig <= 0) { return 0; }

    let res = reduceSignificand(a, newSig);

    return res;
}
