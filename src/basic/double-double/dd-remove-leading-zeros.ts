
/**
 * If the highest power coefficient of the given polynomial is 0 then 
 * `ddRemoveLeadingZeros` can be called to remove all such highest terms so that 
 * the returned array is a valid presentation of a polynomial.
 * 
 * @param p a polynomial whose leading zeros should be removed
 * 
 * @doc
 */
function ddRemoveLeadingZeros(p: number[][]): number[][] {
    let lzCount = 0;
    for (let i=0; i<=p.length-1; i++) {
        if (p[i][1] !== 0) {
            break;
        }
        lzCount++;
    }

    if (lzCount !== 0) { 
        p = p.slice(lzCount);
    }

    return p;
}


export { ddRemoveLeadingZeros }
