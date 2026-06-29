import { describe, expect, it } from '@jest/globals';
import { removeLeadingZeroCoeffs } from '../../src/roots/remove-leading-zero-coeffs.js';

const eps = Number.EPSILON;


describe('`removeLeadingZeroCoeffs`', 
function() {
    it('correctly remove zeros for a polynomial with leading zero coefficients (shouldn\'t remove zero)',
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
    });


    it('correctly remove zeros for a polynomial with leading zero coefficients (should remove zero)',
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
    });


    it('correctly remove zeros for a polynomial with leading zero coefficients (shouldn\'t remove zero)',
    function() {
        // coefficients in double-double precision
        let p = [
            [0, 0.1],  // zero leading coefficient
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
        expect(pExact).toBeUndefined();
        expect(pE.length).toEqual(11);
    });

});


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