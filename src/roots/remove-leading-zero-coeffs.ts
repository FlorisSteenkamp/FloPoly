import { γγ3 } from "../error-analysis/gamma.js";

const { abs } = Math;


/**
 * Removes leading zero coefficients (that are not certifiably non-zero).
 *
 * * the given arrays are **not** modified - new arrays are returned if
 *   anything changed (if the leading coefficient is certifiably non-zero the
 *   given arrays are returned as is)
 *
 * * if the leading coefficient is not certifiably non-zero the exact
 *   polynomial is consulted; the returned `pDd` is then the exact polynomial
 *   rounded to double-double precision and `pDd_` the corresponding error bound
 *
 * * `p` and `getPExact()` *must* be of same length
 *
 * @internal
*/
function removeLeadingZeroCoeffs(
        pDd: number[][],
        pDd_: number[],
        getPExact: () => number[][],
        errorMultiplier: number): { pDd: number[][]; pDd_: number[]; pExact: number[][] | undefined; } {

    // if leading coefficient is guaranteed > zero
    if (pDd.length === 0 || abs(pDd[0][1]) > errorMultiplier*pDd_[0]) {
        return { pDd, pDd_, pExact: undefined };
    }

    let pExact: number[][] = getPExact();  // lazy loaded

    // Create new `pDd` and `pDd_` from the exact polynomial's coefficients
    // (without modifying the given arrays)
    const n = pExact.length;
    let pDdNew = new Array<number[]>(n);
    let pDd_New = new Array<number>(n);
    for (let i=0; i<n; i++) {
        const cExact = pExact[i];
        const hi = cExact[cExact.length - 1] ?? 0;
        const lo = cExact[cExact.length - 2] ?? 0;

        pDdNew[i] = [lo, hi];
        pDd_New[i] = abs(hi) * (γγ3 / errorMultiplier);
    }

    let i = 0;
    while (i < n && pDdNew[i][1] === 0) {
        i++;
    }

    pDdNew = pDdNew.slice(i);
    pDd_New = pDd_New.slice(i);
    pExact = pExact.slice(i);

    return { pDd: pDdNew, pDd_: pDd_New, pExact };
}


export { removeLeadingZeroCoeffs }
