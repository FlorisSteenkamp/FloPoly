import { eSign } from "big-float-ts";
const { abs } = Math;
/**
 * **In-place** remove leading zero coefficients.
 *
 * * `p` and `getPExact()` *must* be of same length
*/
function removeLeadingZeroCoeffs(p, pE, getPExact) {
    let pExact = undefined; // lazy loaded
    // while the leading coefficient is smaller then the error bound 
    // i.e. possibly zero
    while (p.length > 0 && abs(p[0][1]) <= pE[0]) {
        pExact = pExact || getPExact();
        // if leading coefficient really is zero
        if (eSign(pExact[0]) === 0) {
            // shift the leading coefficient and error out without altering the 
            // given polynomial and error bound (shift is destructive, slice is not)
            p = p.slice();
            p.shift();
            pE = pE.slice();
            pE.shift();
            // also shift out the exact polynomial's leading coefficient
            pExact.shift();
            continue;
        }
        break;
    }
    return { p, pE, pExact };
}
export { removeLeadingZeroCoeffs };
//# sourceMappingURL=remove-leading-zero-coeffs.js.map