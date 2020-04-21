
import { subresultantPseudoRemainderSequence } from "../../remainder-sequences/subresultant-pseudo-remainder-sequence";
import { expIsZero } from "../../basic/is-zero";


/**
 * Returns the gcd of the two given polynomials using Pseudo Remainder 
 * Sequences (PRSs).
 * @param a a polynomial
 * @param b another polynomial
 */
function gcdExact(a: number[][], b: number[][]): number[][] {
    let isZeroA = expIsZero(a);
    let isZeroB = expIsZero(b);
    if (isZeroA) {
        return b;
    } else if (isZeroB) {
        return a;
    }
    
    let seq = subresultantPseudoRemainderSequence(a,b,false);

    return seq[seq.length-1];
}


export { gcdExact }
