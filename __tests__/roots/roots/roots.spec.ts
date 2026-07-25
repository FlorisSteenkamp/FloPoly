import { test, describe, expect, it } from '@jest/globals';
import { eCompress } from 'big-float-ts';
import type { RootInterval } from '../../../src/roots/root-interval.js';
import { toCasStr } from '../../../src/basic/to-cas-str';
import { eFromRoots } from '../../../src/roots/from-roots/expansion/e-from-roots';
import { roots as getRoots } from '../../../src/roots/descartes/roots.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { eMobiusAndNumSignChanges } from '../../../src/roots/mobius/mobius-precise.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { eps } from '../../../src/error-analysis/gamma.js';
import { makeFakeGetPExact } from '../make-fake-get-p-exact.js';
import { removeLeadingZeroCoeffs } from '../../../src/roots/remove-leading-zero-coeffs.js';
import { reduceInterval } from '../../../src/roots/reduce-interval.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';


const { min, abs, max, log2, ceil } = Math;


function hasRootsAt(
        rs: RootInterval[],
        rs_: { t: number, multiplicity: number }[]): boolean {

    if (rs.length !== rs_.length) {
        return false;
    }

    for (let i=0; i<rs.length; i++) {
        const { tS, tE, multiplicity } = rs[i];
        const { t, multiplicity: multiplicity_ } = rs_[i];

        if (tS > t || tE < t || multiplicity !== multiplicity_) {
            return false;
        }
        const maxW = 2*multiplicity*eps * max(1, 2**ceil(log2(max(abs(tS), abs(tE)))));
        if (tE - tS > maxW) {
            return false;
        }
    }

    return true;
}


test('find all roots for some cases using Descartes` method', 
function() {
    {
        const pE = [
            [7.099748146989106e-30],
            [-1.1832913578315177e-30, -1.201518026378512e-13]
        ];
        const pDd = [[0,0],[0,0]];
        const p = pDd.map(c => c[1]);
        const pDd_ = [8805996.472572096, 4402998.236286048];
        const I = reduceInterval(-Infinity, Infinity, p, pDd_, γγ3);//?

        const rs1 = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const rs2 = getRoots(pDd, -0, 0, pDd_, () => pE)!;
        const rs3 = getRoots(pDd, 0, 1, pDd_, () => pE)!;

        expect(rs1.length).toEqual(1);
        expect(hasRootsAt(rs1, [{ t: 16923389414708426, multiplicity: 1 }])).toEqual(true);

        expect(rs2.length).toEqual(0);
        expect(rs3.length).toEqual(0);
    }
    {
        let pDd = [
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
        let pDd_ = [
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
        const getPExact = makeFakeGetPExact(pDd, true);
        let pExact: number[][] | undefined = getPExact();

        ({ pDd, pDd_, pExact } = removeLeadingZeroCoeffs(pDd, pDd_, getPExact, γγ3));

        const p = pDd.map(c => c[0] + c[1]);
        const I = reduceInterval(-Infinity, Infinity, p, pDd_, γγ3);

        expect(pDd.length).toEqual(11);
        expect(pExact!.length).toEqual(11);
        expect(pDd_.length).toEqual(11);

        const rs = getRoots(
            pDd,
            -Infinity,
            Infinity,
            pDd_,
            getPExact,
            true
        )!;

        const roots = rs.map(r => r.t);

        const isOk = hasRootsAt(rs, [
            { t: 0.33617428290360196, multiplicity: 1 },
            { t: 0.6260997031130033, multiplicity: 1 },
            { t: 1.3255582424034453, multiplicity: 1 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const pE = [
            [0, 47279295],
            [0, -157379071.5],
            [0, 100304568],
            [0, -23598664.03125],
            [0, 1904993.75390625]
        ];
        const pDd = pE;
        const p = pDd.map(c => c[1]);
        const pDd_ = [0,0,0,0,0];
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        toCasStr(p.map(c => c*2**-20));
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0.3], [0.3], [0.3],
            [0.3], [0.3], [0.3],
            [0.3], [0.3], [0.3], [0.3]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const isOk = hasRootsAt(rs, [
            { t: 0.3, multiplicity: 10 },
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0], [0]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const isOk = hasRootsAt(rs, [
            { t: 0, multiplicity: 2 },
        ]);
        expect(isOk).toBe(true);
    }
    {
        const p = [] as number[];
        const pDd = [] as number[][];
        const p_ = [] as number[];
        const pDd_ = [] as number[];
        const pE = [] as number[][];
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        expect(rs).toBe(undefined);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const isOk = hasRootsAt(rs, [
            { t: 0, multiplicity: 1 },
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [1]
        ]);

        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const isOk = hasRootsAt(rs, [
            { t: 1, multiplicity: 1 },
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0], [2**-3], [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
        const isOk = hasRootsAt(rs, [
            { t: 0, multiplicity: 1 },
            { t: 2**-3, multiplicity: 1 },
            { t: 1, multiplicity: 2 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE);
        const isOk = hasRootsAt(rs!, [
            { t: 1, multiplicity: 2 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0], [2**-3], [2**-8], [2**-2], [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE);
        const isOk = hasRootsAt(rs!, [
            { t: 0, multiplicity: 1 },
            { t: 2**-8, multiplicity: 1 },
            { t: 2**-3, multiplicity: 1 },
            { t: 2**-2, multiplicity: 1 },
            { t: 1, multiplicity: 2 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0], [2**-3], [2**-2], [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE);
        const isOk = hasRootsAt(rs!, [
            { t: 0, multiplicity: 1 },
            { t: 2**-3, multiplicity: 1 },
            { t: 2**-2, multiplicity: 1 },
            { t: 1, multiplicity: 2 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [0], [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE);
        const isOk = hasRootsAt(rs!, [
            { t: 0, multiplicity: 1 },
            { t: 1, multiplicity: 2 }
        ]);
        expect(isOk).toBe(true);
    }
    {
        const { pDd, pDd_, pE } = eFromRoots([
            [1], [1], [1]
        ]);
        const rs = getRoots(pDd, -Infinity, Infinity, pDd_, () => pE);
        const isOk = hasRootsAt(rs!, [
            { t: 1, multiplicity: 3 }
        ]);
        expect(isOk).toBe(true);
    }

    {
        const p = fromRoots([0, 0, 2*(2**-4), 2*(2**-9), 2*(2**-3), 1]);
        const rs = getRoots(p)!;
        expect(rs[0].multiplicity).toEqual(2);
        expect(rs.length).toEqual(5);
    }
    {
        const _rs = [[0.7], [0.8]];
        const { pDd, pDd_, pE } = eFromRoots(_rs);
        const getPExact = () => pE;
        // console.log(toCasStr(getPExact()));
        // => x - 0.5
        const rs = getRoots(pDd, 0, 1, pDd_, getPExact)!;
        // console.log(rs);
        expect(rs[0].tE - rs[0].tS <= 2*Number.EPSILON).toBe(true);
        expect(rs[0].tS <= 0.7).toBe(true);
        expect(rs[0].tE >= 0.7).toBe(true);
        
        expect(rs[1].tE - rs[1].tS <= 2*Number.EPSILON).toBe(true);
        expect(rs[1].tS <= 0.8).toBe(true);
        expect(rs[1].tE >= 0.8).toBe(true);
    }

    {
        const _rs = [[0.7], [-0.8]];
        const { pDd, pDd_, pE } = eFromRoots(_rs);
        const getPExact = () => pE;
        // console.log(toCasStr(getPExact()));
        // => x - 0.5
        const rs = getRoots(pDd, -1, 1, pDd_, getPExact)!;
        // console.log(rs);
        expect(rs[1].tE - rs[1].tS <= 2*Number.EPSILON).toBe(true);
        expect(rs[1].tS <= 0.7).toBe(true);
        expect(rs[1].tE >= 0.7).toBe(true);
        
        expect(rs[0].tE - rs[0].tS <= 2*Number.EPSILON).toBe(true);
        expect(rs[0].tS <= -0.8).toBe(true);
        expect(rs[0].tE >= -0.8).toBe(true);
    }
});


test('eMobius', function() {
    // // Extreme case with underflow; the roots are all 0.3 and the polynomial is of degree 10.
    // const a = 0.2999999999998657;
    // const b = 0.29999999999999893;
    // const A = 1.9061673441006435e-129;
    // const B = 1.703485146024988e-150;
    // const pE = [
    //     [1],
    //     [1.1102230246251565e-16, -3],
    //     [-9.244463733058732e-33, -1.221245327087672e-16, 4.05],
    //     [-4.437342591868191e-33, 1.2878587085651815e-16, -3.2399999999999998],
    //     [1.5326701953552687e-49, 1.7502851334591194e-33, -9.72555369571637e-17, 1.7009999999999998],
    //     [2.140300969894259e-67, 4.0643129287545904e-51, -3.2343297114061453e-34, 1.7705836796721988e-17, -0.6123599999999999],
    //     [-2.3412113192326346e-82, 2.803091598548293e-66, -6.459110108997204e-50, -5.2570183761994e-34, -1.009192729384267e-17, 0.15308999999999998],
    //     [-4.31049119937303e-104, 8.565535828870081e-88, 7.323456623917283e-69, -2.4247321449956572e-52, -6.232309300037048e-36, -1.734168364464502e-19, -0.026243999999999993],
    //     [-5.5311701367110274e-117, -5.484437547135826e-101, -5.74444365926631e-85, 3.572232585954835e-68, 3.187218461490745e-52, 5.696746701101884e-36, -1.3312129176767929e-19, 0.0029524499999999993],
    //     [-2.0910894661989134e-136, 3.213415057317203e-120, -3.406148145516824e-103, -6.549505194074868e-87, -1.1404325230903373e-70, -2.0890863527023084e-54, -3.9489267579715044e-38, 8.930911565840906e-21, -0.00019682999999999994],
    //     [-5.424008964029885e-156, 4.895922411740786e-139, -2.146760732585147e-122, 7.146357215883059e-106, -2.5185063803613107e-88, -1.338714072605202e-71, -3.2048513584743738e-55, -5.827136973161805e-39, 3.605804023421037e-22, 0.0000059048999999999975]
    // ];
    // eCompress(eHorner(pE,b));

    // const r = eMobiusAndNumSignChanges(() => pE, a, b, A, B);

    // expect(r).toBe(0);
});
