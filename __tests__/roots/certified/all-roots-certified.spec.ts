import { describe, expect, it } from '@jest/globals';
// import type { RootInterval } from '../../../src/index.js';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { eMultiply } from '../../../src/basic/expansion/e-multiply.js';
import { eProduct } from '../../../src/basic/expansion/e-product.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { twoSum, eToDd } from 'big-float-ts';
import { γγ } from '../../../src/error-analysis/gamma.js'
import { removeLeadingZeroCoeffs } from '../../../src/roots/remove-leading-zero-coeffs.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { mid } from '../../../src/roots/root-interval.js';
import { RootInterval } from '../../../src/roots/root-interval.js';

const γγ3 = γγ(3);
const eps = Number.EPSILON;
const { ceil, abs, log2, max } = Math;


describe('allRootsCertified - find all roots within an interval of a polynomial with multi-precision coefficients such that all roots are guaranteed to be captured in some interval', 
function() {
    it('should find roots correctly for a polynomial with leading "zero" coefficients',
    function() {
        // coefficients in double-double precision
        let p = [
            [0, 0],  // zero leading coefficient
            [0.1580350755837278, 3770986809251668.5],
            [-0.437621888289444, -11611163849314706],
            [0.37925906415346655, 13622867559528270],
            [-0.18215364304839451, -6015675011409949],
            [-0.2113068076998193, -2535765899677980.5],
            [-0.03234301695064162, 1004670324427690],
            [-0.13228935570003014, 5119556864733271],
            [0.46839905715354696, -5283583821747902],
            [-0.0020342528097285484, 1955103350624411],
            [-0.004629837980953938, -252827841312240.88]
        ];

        // coefficient-wise error bound of double-double precision coefficients
        let pE = [
            1e-19,
            5.973763369817942e-16,
            3.154260190691488e-15,
            1.0432584785199789e-14,
            2.0265321429548282e-14,
            3.236053769569458e-14,
            3.1173345325629133e-14,
            2.228376621708172e-14,
            1.2374462883419778e-14,
            3.82255386973334e-15,
            5.160968273258298e-16
        ];

        // create fake `getPExact`
        const getPExact = makeFakeGetPExact(p, true);
        let pExact: number[][] | undefined = getPExact();

        ({ p, pE, pExact } = removeLeadingZeroCoeffs(p, pE, getPExact));

        expect(p.length).toEqual(11);
        expect(pExact!.length).toEqual(11);
        expect(pE.length).toEqual(11);
        
        const t1 = allRootsCertified(
            p,
            -Infinity,
            Infinity,[],
            getPExact,
            true
        );
        // toCasStr(p.map(eToDd).map(v => v[1]*2**-50));//?
        const rs = t1!.map(mid);

        expect(rs).toEqual([0.33617428290360174, 0.6260997031130032, 1.3255582424034449]);
    });

    it('should find roots correctly for a polynomial with leading actual zero coefficients',
    function() {
        // coefficients in double-double precision
        let p = [
            [0, 0],  // zero leading coefficient
            [0.1580350755837278, 3770986809251668.5],
            [-0.437621888289444, -11611163849314706],
            [0.37925906415346655, 13622867559528270],
            [-0.18215364304839451, -6015675011409949],
            [-0.2113068076998193, -2535765899677980.5],
            [-0.03234301695064162, 1004670324427690],
            [-0.13228935570003014, 5119556864733271],
            [0.46839905715354696, -5283583821747902],
            [-0.0020342528097285484, 1955103350624411],
            [-0.004629837980953938, -252827841312240.88]
        ];

        // coefficient-wise error bound of double-double precision coefficients
        let pE = [
            1e-19,
            5.973763369817942e-16,
            3.154260190691488e-15,
            1.0432584785199789e-14,
            2.0265321429548282e-14,
            3.236053769569458e-14,
            3.1173345325629133e-14,
            2.228376621708172e-14,
            1.2374462883419778e-14,
            3.82255386973334e-15,
            5.160968273258298e-16
        ];

        // create fake `getPExact`
        const getPExact = makeFakeGetPExact(p, false);
        let pExact: number[][] | undefined = getPExact();

        ({ p, pE, pExact } = removeLeadingZeroCoeffs(p, pE, getPExact));

        expect(p.length).toEqual(10);
        expect(pExact!.length).toEqual(10);
        expect(pE.length).toEqual(10);

        const t1 = allRootsCertified(
            p,
            -Infinity,
            Infinity,[],
            getPExact,
            true
        );
        // toCasStr(p.map(eToDd).map(v => v[1]*2**-50));//?
        const rs = t1!.map(mid);

        expect(rs).toEqual([/*0.33617428290360174*/ 0.3361742829036018, 0.6260997031130032, 1.3255582424034449]);
    });

    it('should not give a type error when omitting the `returnUndefinedForZeroPoly` paramter', 
    function() {
        // The below commented lines implicitly explains what we're trying to 
        // achieve with this test.
        //
        // const a = [] as number[] | undefined;
        // a[0];  // TypeScript error: "Object is possibly 'undefined'.ts(2532)"
        //
        // const b = [] as number[];
        // b[0];  // no TypeScript error

        const t1 = allRootsCertified([],0,1,[],() => [], true);        // RootInterval[] | undefined
        const t2 = allRootsCertified([],0,1,[],() => [], false);       // RootInterval[]
        const t3 = allRootsCertified([],0,1,[],() => [], undefined);   // RootInterval[]
        const t4 = allRootsCertified([],0,1,[],() => [], );            // RootInterval[]
        const t5 = allRootsCertified([],0,1,[],() => []  );            // RootInterval[]

        try {
            // @ts-expect-error (if TypeScript shows an error here: "Unused '@ts-expect-error' directive.ts(2578)" then don't worry! It is due to tsconfig.json not using 'strict')
            t1[0];  // should give a TypeScript error: "Object is possibly 'undefined'.ts(2532)"
        } catch {
            // We ain't catchin' nothing
        }
        t2[0];  // should not give a TypeScript error
        t3[0];  // should not give a TypeScript error
        t4[0];  // should not give a TypeScript error
        t5[0];  // should not give a TypeScript error
    });
    

    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 1', 
    function() {
        let p1: number[][] = [];
        let p2 = [[3]];
        let roots1 = allRootsCertified(p1, undefined, undefined, undefined, undefined, true);
        let roots2 = allRootsCertified(p2, undefined, undefined, undefined, undefined, true);
        expect(roots1 === undefined).toEqual(true);
        expect(roots2 && roots2.length === 0).toEqual(true);
    });
    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 2',
    function() {
        let p: number[][] = [[0,0],[0,0],[0,0]];
        let pE: number[] = [1,1,1];
        let getPExact = () => [[0],[0],[0]];
        let roots = allRootsCertified(p, 0, 1, pE, getPExact, true);
        expect(roots === undefined).toEqual(true);
    });
    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 3',
    function() {
        let p: number[][] = [[0,0],[0,0],[0,0],[0,1e-9]];
        let pE: number[] = [0,0,0,1];
        let getPExact = () => [[0],[0],[0],[1e-10]];
        let roots = allRootsCertified(p, 0, 1, pE, getPExact, true);
        expect(roots && roots.length === 0).toEqual(true);
    });
    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 4',
    function() {
        let p: number[][] = [[0,0],[0,0],[0,1e-8],[0,0],[0,-1e-9]];
        let pE: number[] = [1,1,1,1,1];
        let getPExact = () => [[0],[0],[0],[0],[1e-10]];
        let roots = allRootsCertified(p, 0, 1, pE, getPExact, true);
        expect(roots && roots.length === 0).toEqual(true);
    });
    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 5',
    function() {
        let p: number[][] = [[0,0],[0,0],[0,1e-8],[0,0],[0,-1e-9]];
        let pE: number[] = [1,1,1,1,1];
        let getPExact = () => [[0],[0],[0],[0],[0]];
        let roots = allRootsCertified(p, 0, 1, pE, getPExact, true);
        expect(roots === undefined).toEqual(true);
    });

    it('should not return roots for the zero or a constant polynomial and `undefined` when appropriate - part 5',
    function() {
        let p: number[][] = [[0,0],[0,0],[0,1],[0,0],[0,-0.5]];
        let pE: number[] = [1,1,0.5,0,0.25];
        //let getPExact = () => [[0],[0],[0.99999999],[0],[-0.50001]];
        let getPExact = () => [[0],[0],[1],[0],[-0.5]];
        let roots = allRootsCertified(p, 0, 1, pE, getPExact, true);
        expect(roots && roots.length === 1).toEqual(true);
    });

    it('should not return roots for the zero or a constant polynomial', 
    function() {
        let p1: number[][] = [];
        let p2 = [[3]];        
        let roots1 = allRootsCertified(p1);
        let roots2 = allRootsCertified(p2);
        expect(roots1.length === 0).toEqual(true);
        expect(roots2.length === 0).toEqual(true);
    });
    it('should find roots correctly of basic polynomials (with infinite range)',
    function() {
        {
            // p = x^2
            const  { p, pE, getPExact } = makePoly([1,0,0]);
            const ts = allRootsCertified(p, -Infinity, Infinity, pE, getPExact);
            
            // double root at 0
            expect(isThereRootAt(0, 2, ts)).toEqual(true);
        }
        {
            // p = x^2 - 1
            const  { p, pE, getPExact } = makePoly([1,0,-1]);
            const ts = allRootsCertified(p, -Infinity, Infinity, pE, getPExact);

            // simple root at -1 and +1
            expect(isThereRootAt(-1, 1, ts)).toEqual(true);
            expect(isThereRootAt(+1, 1, ts)).toEqual(true);
        }
    });


    it('should find roots correctly of some polynomials (withing some range [-50,100])',
    function() {
        // coefficients in double-double precision
        let p = [
            [ 0.1580350755837278, 3770986809251668.5 ],
            [ -0.437621888289444, -11611163849314706 ],
            [ 0.37925906415346655, 13622867559528270 ],
            [ -0.18215364304839451, -6015675011409949 ],
            [ -0.2113068076998193, -2535765899677980.5 ],
            [ -0.03234301695064162, 1004670324427690 ],
            [ -0.13228935570003014, 5119556864733271 ],
            [ 0.46839905715354696, -5283583821747902 ],
            [ -0.0020342528097285484, 1955103350624411 ],
            [ -0.004629837980953938, -252827841312240.88 ]
        ];

        // coefficients in double precision
        let pD = [
            3770986809251668.5,
            -11611163849314706,
            13622867559528270,
            -6015675011409949,
            -2535765899677980.5,
            1004670324427690,
            5119556864733271,
            -5283583821747902,
            1955103350624411,
            -252827841312240.88
        ];

        // coefficient-wise error bound of double-double precision 
        // coefficients
        let pE = [
            5.973763369817942e-16,
            3.154260190691488e-15,
            1.0432584785199789e-14,
            2.0265321429548282e-14,
            3.236053769569458e-14,
            3.1173345325629133e-14,
            2.228376621708172e-14,
            1.2374462883419778e-14,
            3.82255386973334e-15,
            5.160968273258298e-16
        ];

        //getPExact - not specified

        let lb = -50;
        let ub = 100;
        const ts = allRootsCertified(p, lb, ub, pE, undefined);
        
        // roots:
        // [
        //     { tS: 0.3361742829036018, tE: 0.336174282903602, multiplicity: 1 },
        //     { tS: 0.6260997031130031, tE: 0.6260997031130033, multiplicity: 1 },
        //     { tS: 1.3255582424034447, tE: 1.3255582424034453, multiplicity: 1 }
        // ]

        expect(isThereRootAt(0.3361742829036019, 1, ts)).toEqual(true);
        expect(isThereRootAt(0.6260997031130032, 1, ts)).toEqual(true);
        expect(isThereRootAt(1.3255582424034449, 1, ts)).toEqual(true);

        //const tsf = allRoots(pD, lb, ub);
    });


    it('should find roots correctly of some polynomials (some special cases 0)',
    function() {
        // Here we're trying to put roots on top of lower and upper bounds
        // to trigger some special case causing specific lines in 
        // `evalAdaptive` to be triggered.

        // coefficients in infinite precision (double root at 1 and 2)
        let _p = eMultiply(
            eMultiply([[1],[-1]],[[1],[-1]]),
            eMultiply([[1],[-2]],[[1],[-2]])
        );
        // coefficients in double-double precision
        let p = _p.map(c => eToDd(c));
        // coefficient-wise error bound of double-double precision 
        // coefficients (faked)
        let pE = p.map(c => Math.abs(c[1])*Number.EPSILON);
        let lb = 1;
        let ub = 2;

        const ts = allRootsCertified(p, lb, ub, pE);
        
        // roots:
        // [
        //     { tS: 0.3361742829036018, tE: 0.336174282903602, multiplicity: 1 },
        //     { tS: 0.6260997031130031, tE: 0.6260997031130033, multiplicity: 1 },
        //     { tS: 1.3255582424034447, tE: 1.3255582424034453, multiplicity: 1 }
        // ]

        //expect(isThereRootAt(0.3361742829036019, 1, ts)).toEqual(true);
        //expect(isThereRootAt(0.6260997031130032, 1, ts)).toEqual(true);
        //expect(isThereRootAt(1.3255582424034449, 1, ts)).toEqual(true);

        //const tsf = allRoots(pD, lb, ub);
    });


    it('should find roots correctly of some polynomials (some special cases 1)',
    function() {
        // coefficients in infinite precision - lots o' roots at 3.4
        let _p = eMultiply(
            eMultiply([[1],[-2*1.7]], [[1],[-2*1.7]]),
            eMultiply([[1],[-2.32*1.7]], [[1],[-2.12*1.7]])
        );
        // coefficients in double-double precision
        let p = _p.map(c => eToDd(c));
        // coefficient-wise error bound of double-double precision 
        // coefficients (faked)
        let pE = p.map(c => Math.abs(c[1])*Number.EPSILON);
        let lb0 = 0;
        let lb1 = 3.4;
        let ub1 = 100;
        let lb2 = 1;
        let ub2 = 3.4;
        
        const ts0 = allRootsCertified(p, lb0, ub1, pE);
        const ts1 = allRootsCertified(p, lb1, ub1, pE);
        const ts2 = allRootsCertified(p, lb2, ub2, pE);
        
        ts0;//?
        expect(areRootsWithinBounds(ts0, [
            { t: 3.3999999999999955, multiplicity: 1 },
            { t: 3.4, multiplicity: 2 },
            { t: 3.4000000000000035, multiplicity: 1 },
            { t: 3.604, multiplicity: 1 },
            { t: 3.9439999999999995, multiplicity: 1 }
        ])).toBe(true);

        expect(areRootsWithinBounds(ts1, [
            { t: 3.4, multiplicity: 2 },
            { t: 3.4000000000000035, multiplicity: 1 },
            { t: 3.604, multiplicity: 1 },
            { t: 3.9439999999999995, multiplicity: 1 }
        ])).toBe(true);

        expect(ts2).toEqual([
            { tS: 3.3999999999999955, tE: 3.3999999999999964, multiplicity: 1 },
            { tS: 3.4, tE: 3.4000000000000017, multiplicity: 2 }
        ]);
    });


    // it('should find roots correctly of some polynomials (some special cases 2)',
    // function() {
    //     let _p = eProduct([
    //         [[1],[-3.3999999999999986]],
    //         [[1],[-3.3999999999999995]], 
    //         [[1],[-3.4]],
    //         [[1],[-3.4]],
    //         [[1],[-3.9439999999999995]], 
    //         [[1],[+0.604]]
    //     ]);

    //     let pDd = _p.map(c => eToDd(c));
    //     // some fake generated error
    //     let pE = pDd.map(c => Math.abs(c[1])*Number.EPSILON);
    //     let lb0 = -50;
    //     let ub0 = 50;
    //     function f() { return _p; }
    //     const ts = allRootsCertified(pDd, lb0, ub0, pE, f);

    //     expect(areRootsWithinBounds(ts, [
    //         { t: -0.604, multiplicity: 1 },
    //         { t: 3.4, multiplicity: 2 },
    //         { t: 3.944, multiplicity: 1 }
    //     ])).toBe(true);
    // });


    // it('should find roots correctly of some polynomials (some special cases 3)',
    // function() {
    //     let _p = eProduct([
    //         [[1],[-3.4]],
    //         [[1],[-3.4]], 
    //         [[1],[-3.4000000000000004]],
    //         [[1],[-3.400000000000001]],
    //         [[1],[-3.9439999999999995]], 
    //         [[1],[+0.604]]
    //     ]);

    //     let pDd = _p.map(c => eToDd(c));
    //     // some fake generated error
    //     let pE = pDd.map(c => Math.abs(c[1])*Number.EPSILON);
    //     let lb0 = -50;
    //     let ub0 = 50;
    //     function f() { return _p; }
    //     const ts = allRootsCertified(pDd, lb0, ub0, pE, f);

    //     expect(areRootsWithinBounds(ts, [
    //         { t: -0.6040000000000001, multiplicity: 1 },
    //         { t: 3.4, multiplicity: 4 },
    //         { t: 3.9439999999999995, multiplicity: 1 }
    //     ])).toBe(true);
    // });
    /*
    it('should find roots correctly of some polynomials (some special cases 4)',
    function() {
        let _p = [];

        const m = 16;
        const polyDd = [
            [0,m*0],
            [0,m*-9],
            [0,m*9],
            [0,m*-1.6875]
        ];
        const polyE = [m*0, m*18, m*9, m*0];

        const polyExact = [[m*0],[m*-9],[m*9],[0,m*-1.6875]];
        const getPolyExact = (): number[][] => { return polyExact; };

        const polyE_ = polyE.map(c => γγ3*c);

        const ris1 = allRootsCertified(polyDd, 0, 1, polyE , getPolyExact, true);
        const ris2 = allRootsCertified(polyDd, 0, 1, polyE_, getPolyExact, true);

        eHorner(polyExact,0.75);//?
    });
    */
});


function isThereRootAt(
        // t: number, multiplicity: number, roots: RootInterval[]) {
        t: number, multiplicity: number, roots: any[]) {

    for (let r of roots) {
        if (
            r.tS <= t && 
            r.tE >= t && 
            r.tE - r.tS <= 4 * Number.EPSILON &&
            r.multiplicity === multiplicity) {

            return true;
        }
    }

    return false;
}


// make a double-double coefficient polynomial from the given double precision
// input polynomial - perturbs the polynomial a bit
function makePoly(pp: number[]) {
    // a perturbation factor
    let d = 2**3*Number.EPSILON;

    // make double-double poly
    const p = pp.map(c => twoSum(d*c, c));

    // same poly but exact
    const pExact = pp.map(c => [0, c]);

    let getPExact = () => pExact;

    // coeffientwise error bound of the input poly
    const pE = pp.map(c => Math.abs(d*c));
    

    return { p, pE, getPExact };
}


function makeFakeGetPExact(
        p: number[][],
        makeLeadingNonZero: boolean) {

    const getPExact = () => {
        const pExact = p.map(dd => {
            const e = ddToE(dd).slice();
            e.unshift(eps/4 * e[0]);
            return e;
        });

        if (makeLeadingNonZero) {
            pExact[0] = [eps*2**-16];
        }
        
        return pExact;
    }

    return getPExact;
}


// FUTURE - now availble from big-float-ts
function ddToE(dd: number[]) {
    if (dd[0] === 0) {
        return [dd[1]];
    }

    return dd; // return only most significant parts
}


function areRootsWithinBounds(
        roots: RootInterval[],
        expectedBounds: { t: number; multiplicity: number }[]): boolean {

    if (roots.length !== expectedBounds.length) {
        return false;
    }
    // roots;//?
    // expectedBounds;//?
    const used = new Array(roots.length).fill(false);
    for (const b of expectedBounds) {
        let found = false;
        for (let i=0; i<roots.length; i++) {
            if (used[i]) { continue; }

            const r = roots[i];
            const overlaps =
                r.tS <= b.t && r.tE >= b.t &&
                r.tE - r.tS <= (2**ceil(log2(abs(r.tE))) * 4 * Number.EPSILON);
            if (r.multiplicity === b.multiplicity && overlaps) {
                used[i] = true;
                found = true;
                break;
            }
        }

        if (!found) {
            // b;//?
            return false;
        }
    }

    return true;
}