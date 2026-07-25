import { eSign } from "big-float-ts";
import { γγ3 } from "../error-analysis/gamma.js";

const { abs } = Math;


/**
 * **In-place** remove leading zero coefficients.
 * 
 * * `p` and `getPExact()` *must* be of same length
 * 
 * @internal
*/
function removeLeadingZeroCoeffs(
        pDd: number[][],
        pDd_: number[],
        getPExact: () => number[][],
        errorMultiplier: number) {

    let pExact: number[][] | undefined = undefined;  // lazy loaded
    // while the leading coefficient is smaller then the error bound 
    // i.e. possibly zero

    // if leading coefficient is guaranteed > zero
    if (pDd.length === 0 || abs(pDd[0][1]) > errorMultiplier*pDd_[0]) {
        return { pDd, pDd_, pExact };
    }

    pExact = pExact || getPExact();

    // Update `pDd` and `pDd_` with the exact polynomial's leading coefficients and error bounds
    for (let i=0; i<pExact.length; i++) {
        const cExact = pExact[i];
        const cDd = pDd[i];

        cDd[1] = cExact[cExact.length - 1];
        cDd[0] = cExact[cExact.length - 2] ?? 0;

        pDd_[i] = abs(cDd[1]) * (γγ3 / errorMultiplier);
    }

    let i = 0;
    while (i < pDd.length && pDd[i][1] === 0) {
        i++;
    }

    pDd = pDd.slice(i);
    pDd_ = pDd_.slice(i);
    pExact = pExact.slice(i);

    return { pDd, pDd_, pExact };
}


export { removeLeadingZeroCoeffs }
