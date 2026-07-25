import { ddToE } from "big-float-ts";
import { eps } from '../../src/error-analysis/gamma.js';


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


export { makeFakeGetPExact }
