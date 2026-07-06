import { eSign } from "big-float-ts";
const { abs } = Math;
/**
 * **In-place** remove leading zero coefficients.
 *
 * * `p` and `getPExact()` *must* be of same length
 *
 * @internal
*/
function removeLeadingZeroCoeffs(pDd, pDd_, getPExact, errorMultiplier) {
    let pExact = undefined; // lazy loaded
    // while the leading coefficient is smaller then the error bound 
    // i.e. possibly zero
    while (pDd.length > 0 && abs(pDd[0][1]) <= errorMultiplier * pDd_[0]) {
        pExact = pExact || getPExact();
        // if leading coefficient really is zero
        if (eSign(pExact[0]) === 0) {
            // shift the leading coefficient and error out without altering the 
            // given polynomial and error bound (shift is destructive, slice is not)
            pDd = pDd.slice();
            pDd.shift();
            pDd_ = pDd_.slice();
            pDd_.shift();
            // also shift out the exact polynomial's leading coefficient
            pExact.shift();
            continue;
        }
        break;
    }
    return { pDd: pDd, pDd_: pDd_, pExact };
}
export { removeLeadingZeroCoeffs };
//# sourceMappingURL=remove-leading-zero-coeffs.js.map